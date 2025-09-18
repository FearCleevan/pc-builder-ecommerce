// client/src/components/AIAssistant/AIAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { allProducts } from '../MockData/allProducts';
import { laptopProducts } from '../MockData/laptopProducts';
import { desktopProducts } from '../MockData/desktopProducts';
import { otherProducts } from '../MockData/otherProducts';
import { accessoriesProducts } from '../MockData/accessoriesProducts';
import { categories, getSeriesItems, gpuOptions, processorOptions, screenSizeOptions, ramOptions, storageOptions } from '../MockData/LaptopMockData';

// Import PC building components data
import { caseData } from '../PCBuilder/Modal/MockData/Case/Case';
import { cpuData } from '../PCBuilder/Modal/MockData/CPU/CPU';
import { motherboardData } from '../PCBuilder/Modal/MockData/Motherboard/Motherboard';
import { gpuData } from '../PCBuilder/Modal/MockData/GPU/GPU';
import { ramData } from '../PCBuilder/Modal/MockData/RAM/Ram';
import { cpuCoolerData } from '../PCBuilder/Modal/MockData/CPU Cooler/CPUCooler';
import { storageData } from '../PCBuilder/Modal/MockData/Storage/Storage';
import { caseFanData } from '../PCBuilder/Modal/MockData/Case Fan/CaseFan';
import { powerSupplyData } from '../PCBuilder/Modal/MockData/Power Suppy/PowerSupply';
import { monitorData } from '../PCBuilder/Modal/MockData/Monitor/Monitor';
import { mouseData } from '../PCBuilder/Modal/MockData/Mouse/Mouse';
import { keyboardData } from '../PCBuilder/Modal/MockData/Keyboard/Keyboard';
import { speakerData } from '../PCBuilder/Modal/MockData/Speaker/Speaker';
import { headphonesData } from '../PCBuilder/Modal/MockData/Headphones/Headphones';
import { microphoneData } from '../PCBuilder/Modal/MockData/Microphone/Microphone';
import { webcamData } from '../PCBuilder/Modal/MockData/Webcam/Webcam';

import styles from './AIAssistant.module.css';

// Gemini AI API integration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi there! I'm your TechnoBuild shopping assistant. How can I help you today? You can ask about products, get recommendations, request help filtering options, or build a custom PC!",
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [useGeminiAI, setUseGeminiAI] = useState(true);
    const messagesEndRef = useRef(null);

    // Combine all PC components into a single array for easy access
    const allItems = [
        ...allProducts,
        ...laptopProducts,
        ...desktopProducts,
        ...otherProducts,
        ...accessoriesProducts,
        ...caseData,
        ...cpuData,
        ...motherboardData,
        ...gpuData,
        ...ramData,
        ...cpuCoolerData,
        ...storageData,
        ...caseFanData,
        ...powerSupplyData,
        ...monitorData,
        ...mouseData,
        ...keyboardData,
        ...speakerData,
        ...headphonesData,
        ...microphoneData,
        ...webcamData
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Enhanced Gemini AI API call with better context
    const callGeminiAI = async (userMessage, context = '') => {
        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a TechnoBuild product shopping assistant. Help users find products, compare options, build custom PCs, and make purchasing decisions.
              
              CONTEXT:
              ${context}
              
              AVAILABLE PRODUCT CATEGORIES: ${categories.join(', ')}
              
              FILTER OPTIONS:
              - GPUs: ${gpuOptions.join(', ')}
              - Processors: ${processorOptions.join(', ')}
              - Screen Sizes: ${screenSizeOptions.join(', ')}
              - RAM: ${ramOptions.join(', ')}
              - Storage: ${storageOptions.join(', ')}
              - Series: ${getSeriesItems().join(', ')}
              
              USER MESSAGE: ${userMessage}
              
              Respond in a helpful, friendly manner. If recommending products or builds, be specific about features and benefits. Use the available filter options to provide precise recommendations.`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Gemini AI API error:', error);
            return null;
        }
    };

    // Helper functions
    const extractProductNames = (message) => {
        const productKeywords = allItems.map(p => p.name.toLowerCase());
        return productKeywords.filter(keyword =>
            message.toLowerCase().includes(keyword)
        );
    };

    const extractBudget = (message) => {
        const budgetMatch = message.match(/(\d+)(?:\s*(?:k|thousand))?/i);
        return budgetMatch ? parseInt(budgetMatch[1]) * (budgetMatch[2] ? 1000 : 1) : null;
    };

    const extractFilters = (message) => {
        const filters = {};
        const lowerMessage = message.toLowerCase();

        // Extract GPU filter
        gpuOptions.forEach(gpu => {
            if (lowerMessage.includes(gpu.toLowerCase())) {
                filters.gpu = gpu;
            }
        });

        // Extract Processor filter
        processorOptions.forEach(processor => {
            if (lowerMessage.includes(processor.toLowerCase())) {
                filters.processor = processor;
            }
        });

        // Extract RAM filter
        ramOptions.forEach(ram => {
            if (lowerMessage.includes(ram.toLowerCase())) {
                filters.ram = ram;
            }
        });

        // Extract Storage filter
        storageOptions.forEach(storage => {
            if (lowerMessage.includes(storage.toLowerCase())) {
                filters.storage = storage;
            }
        });

        // Extract Screen Size filter
        screenSizeOptions.forEach(screenSize => {
            if (lowerMessage.includes(screenSize.toLowerCase())) {
                filters.screenSize = screenSize;
            }
        });

        // Extract Category filter
        categories.forEach(category => {
            if (lowerMessage.includes(category.toLowerCase())) {
                filters.category = category;
            }
        });

        return filters;
    };

    const generateComparison = (products) => {
        if (products.length < 2) return "I need at least two products to compare.";

        let comparison = "Here's a detailed comparison:\n\n";

        products.forEach((product, index) => {
            comparison += `🏆 ${index + 1}. ${product.name}\n`;
            comparison += `   💰 Price: ₱${product.price.toLocaleString()}\n`;
            if (product.rating) {
                comparison += `   ⭐ Rating: ${product.rating}/5\n`;
            }
            if (product.category) {
                comparison += `   📦 Category: ${product.category}\n`;
            }
            if (product.specs) {
                Object.entries(product.specs).forEach(([key, value]) => {
                    if (value) comparison += `   🔧 ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
                });
            }
            comparison += '\n';
        });

        return comparison;
    };

    const generateSpecifications = (product) => {
        let specs = `📋 Specifications for ${product.name}:\n\n`;
        if (product.brand) specs += `• 🏷️ Brand: ${product.brand}\n`;
        specs += `• 💰 Price: ₱${product.price.toLocaleString()}\n`;
        if (product.rating) specs += `• ⭐ Rating: ${product.rating}/5\n`;
        if (product.reviews) specs += `• 📊 Reviews: ${product.reviews}\n`;
        if (product.category) specs += `• 📦 Category: ${product.category}\n`;

        if (product.specs) {
            Object.entries(product.specs).forEach(([key, value]) => {
                if (value) specs += `• 🔧 ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
            });
        }

        if (product.description) specs += `\n📝 Description: ${product.description}`;
        return specs;
    };

    // Enhanced product search with filter support
    const searchProducts = (query, filters = {}) => {
        let results = [...allItems];

        // Simple text search
        if (query) {
            const searchTerms = query.toLowerCase().split(' ');
            results = results.filter(product =>
                searchTerms.some(term =>
                    product.name.toLowerCase().includes(term) ||
                    (product.description && product.description.toLowerCase().includes(term)) ||
                    (product.brand && product.brand.toLowerCase().includes(term)) ||
                    (product.category && product.category.toLowerCase().includes(term)) ||
                    (product.specs && Object.values(product.specs).some(spec =>
                        spec && spec.toString().toLowerCase().includes(term)
                    ))
                )
            );
        }

        // Apply advanced filters
        if (filters.category) {
            results = results.filter(product => product.category === filters.category);
        }

        if (filters.gpu) {
            results = results.filter(product =>
                product.specs?.gpu?.toLowerCase().includes(filters.gpu.toLowerCase())
            );
        }

        if (filters.processor) {
            results = results.filter(product =>
                product.specs?.processor?.toLowerCase().includes(filters.processor.toLowerCase())
            );
        }

        if (filters.ram) {
            results = results.filter(product =>
                product.specs?.ram?.toLowerCase().includes(filters.ram.toLowerCase())
            );
        }

        if (filters.storage) {
            results = results.filter(product =>
                product.specs?.storage?.toLowerCase().includes(filters.storage.toLowerCase())
            );
        }

        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            results = results.filter(product => product.price >= min && product.price <= max);
        }

        if (filters.rating) {
            results = results.filter(product => product.rating >= parseFloat(filters.rating));
        }

        return results.slice(0, 8); // Return more results for better selection
    };

    // Enhanced recommendations using all available data
    const generateRecommendations = (userNeeds) => {
        let recommendations = [];
        const lowerNeeds = userNeeds.toLowerCase();

        if (lowerNeeds.includes('gaming') || lowerNeeds.includes('game')) {
            recommendations = [
                ...laptopProducts.filter(p => p.category === 'Gaming Laptops'),
                ...desktopProducts.filter(p => p.series === 'gaming-series'),
                ...gpuData.filter(gpu => gpu.specs?.series?.toLowerCase().includes('gaming')),
                ...cpuData.filter(cpu => cpu.specs?.series?.toLowerCase().includes('gaming')),
                ...getSeriesItems().filter(series => series.toLowerCase().includes('gaming'))
                    .flatMap(series => allItems.filter(item => item.series === series))
            ];
        }

        if (lowerNeeds.includes('business') || lowerNeeds.includes('work')) {
            recommendations = [
                ...laptopProducts.filter(p => p.category === 'Business Laptops'),
                ...desktopProducts.filter(p => p.series === 'workstation-series'),
                ...allItems.filter(item => item.features?.includes('security') || item.features?.includes('reliability'))
            ];
        }

        if (lowerNeeds.includes('creative') || lowerNeeds.includes('design')) {
            recommendations = [
                ...laptopProducts.filter(p => p.category === 'Content Creation Laptops'),
                ...desktopProducts.filter(p => p.series === 'workstation-series'),
                ...monitorData.filter(monitor => monitor.specs?.colorAccuracy),
                ...gpuData.filter(gpu => gpu.specs?.vram >= 8),
                ...allItems.filter(item => item.features?.includes('color accurate') || item.features?.includes('creative'))
            ];
        }

        if (lowerNeeds.includes('budget') || lowerNeeds.includes('cheap')) {
            recommendations = allItems
                .filter(item => item.price <= 30000)
                .sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        if (lowerNeeds.includes('premium') || lowerNeeds.includes('high-end')) {
            recommendations = allItems
                .filter(item => item.price >= 70000)
                .sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        // If no specific needs, recommend popular items
        if (recommendations.length === 0) {
            recommendations = allItems
                .filter(item => item.rating >= 4)
                .sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        }

        return recommendations.slice(0, 5);
    };

    // Enhanced sales pitches using all available features
    const generateSalesPitch = (product) => {
        const pitches = {
            'Gaming Laptops': `The ${product.name} is perfect for gaming with its ${product.specs?.gpu || 'powerful graphics'} and high-performance specs. ${product.features ? 'Features: ' + product.features.join(', ') : ''}`,
            'Business Laptops': `The ${product.name} provides enterprise-grade security and reliability for professional use. ${product.features ? 'Includes: ' + product.features.join(', ') : ''}`,
            'Content Creation Laptops': `Ideal for creative work, the ${product.name} offers excellent performance and display quality. ${product.features ? 'Perfect for: ' + product.features.join(', ') : ''}`,
            'CPU': `The ${product.name} delivers exceptional processing power with ${product.specs?.cores || 'multiple'} cores. ${product.specs?.clockSpeed ? 'Clock speed: ' + product.specs.clockSpeed : ''}`,
            'GPU': `Experience stunning graphics with the ${product.name} featuring ${product.specs?.vram || 'ample'} VRAM. ${product.specs?.memoryType ? 'Memory type: ' + product.specs.memoryType : ''}`,
            'default': `The ${product.name} is an excellent choice ${product.rating ? `with a ${product.rating}/5 rating` : ''} ${product.features ? 'featuring: ' + product.features.join(', ') : ''}`
        };

        return pitches[product.category] || pitches[product.type] || pitches.default;
    };

    // Generate product card component
    const generateProductCard = (product) => {
        return {
            type: 'productCard',
            product: product,
            timestamp: new Date()
        };
    };

    // PC Building Functions
    const generatePCPartRecommendation = (componentType, budget, purpose = 'general') => {
        let components = [];

        switch (componentType.toLowerCase()) {
            case 'cpu':
                components = [...cpuData];
                break;
            case 'gpu':
            case 'graphics card':
                components = [...gpuData];
                break;
            case 'motherboard':
                components = [...motherboardData];
                break;
            case 'ram':
            case 'memory':
                components = [...ramData];
                break;
            case 'storage':
                components = [...storageData];
                break;
            case 'power supply':
            case 'psu':
                components = [...powerSupplyData];
                break;
            case 'case':
                components = [...caseData];
                break;
            case 'cooler':
            case 'cpu cooler':
                components = [...cpuCoolerData];
                break;
            default:
                return [];
        }

        // Filter by budget
        if (budget) {
            components = components.filter(comp => comp.price <= budget);
        }

        // Filter by purpose
        if (purpose === 'gaming') {
            components = components.filter(comp =>
                comp.specs?.series?.toLowerCase().includes('gaming') ||
                comp.description?.toLowerCase().includes('gaming')
            );
        } else if (purpose === 'workstation') {
            components = components.filter(comp =>
                comp.specs?.series?.toLowerCase().includes('workstation') ||
                comp.description?.toLowerCase().includes('professional')
            );
        }

        return components
            .sort((a, b) => (b.rating || 0) - (a.rating || 0) || a.price - b.price)
            .slice(0, 3);
    };

    const buildCompletePC = (budget, purpose = 'gaming') => {
        const budgetAllocation = {
            cpu: purpose === 'gaming' ? 0.25 : 0.3,
            gpu: purpose === 'gaming' ? 0.35 : purpose === 'creative' ? 0.4 : 0.2,
            motherboard: 0.1,
            ram: 0.05,
            storage: 0.1,
            powerSupply: 0.05,
            case: 0.05,
            cooler: 0.05
        };

        const build = {};
        let totalPrice = 0;

        // Select components based on budget allocation
        Object.keys(budgetAllocation).forEach(componentType => {
            const componentBudget = budget * budgetAllocation[componentType];
            const recommendations = generatePCPartRecommendation(componentType, componentBudget, purpose);

            if (recommendations.length > 0) {
                build[componentType] = recommendations[0];
                totalPrice += recommendations[0].price;
            }
        });

        return { build, totalPrice };
    };

    const generatePCBuildCard = (build, totalPrice, purpose) => {
        return {
            type: 'pcBuild',
            build: build,
            totalPrice: totalPrice,
            purpose: purpose,
            timestamp: new Date()
        };
    };

    // Enhanced AI processing with Gemini AI integration
    const enhancedProcessMessage = async (userMessage) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const message = userMessage.toLowerCase();
        let response = { type: 'text', content: '' };
        let products = [];
        let productCards = [];
        let pcBuild = null;

        // Try Gemini AI first if enabled
        if (useGeminiAI) {
            try {
                const productContext = allItems.slice(0, 20).map(p =>
                    `${p.name}: ${p.description} (₱${p.price.toLocaleString()}) ${p.features ? 'Features: ' + p.features.join(', ') : ''}${p.specs ? ' Specs: ' + JSON.stringify(p.specs) : ''}`
                ).join('\n');

                const aiResponse = await callGeminiAI(userMessage, `
                Available Products Context:
                ${productContext}
                
                Filter Options:
                - Categories: ${categories.join(', ')}
                - GPUs: ${gpuOptions.join(', ')}
                - Processors: ${processorOptions.join(', ')}
                - RAM: ${ramOptions.join(', ')}
                - Storage: ${storageOptions.join(', ')}
                - Screen Sizes: ${screenSizeOptions.join(', ')}
                - Series: ${getSeriesItems().join(', ')}
            `);

                if (aiResponse) {
                    response.content = aiResponse;

                    // Extract mentioned products for cards
                    const mentionedProducts = allItems.filter(product =>
                        aiResponse.toLowerCase().includes(product.name.toLowerCase()) ||
                        (product.specs && Object.values(product.specs).some(spec =>
                            spec && aiResponse.toLowerCase().includes(spec.toString().toLowerCase())
                        ))
                    ).slice(0, 3);

                    mentionedProducts.forEach(product => {
                        productCards.push(generateProductCard(product));
                    });

                    setIsTyping(false);
                    return { response, productCards, pcBuild };
                }
            } catch (error) {
                console.log('Falling back to rule-based system:', error);
            }
        }

        // Rule-based system with enhanced filtering
        const extractedFilters = extractFilters(userMessage);
        // const budget = extractBudget(userMessage);
        const productNames = extractProductNames(message);

        // Greeting
        if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message.includes('greeting')) {
            response.content = "Hello! Welcome to TechnoBuild! 🛍️ How can I assist you with your tech shopping today?";
        }
        // Help command
        else if (message.includes('help') || message.includes('what can you do') || message.includes('capabilities')) {
            response.content = `I can help you with: 🔧\n• Product search and recommendations\n• Custom PC building\n• Technical specifications\n• Price comparisons\n• Filtering by categories, specs, and features\n• Component compatibility checking\n\nWhat would you like to do?`;
        }
        // Filter-based search
        else if (Object.keys(extractedFilters).length > 0 || message.includes('filter') || message.includes('with') || message.includes('having')) {
            if (Object.keys(extractedFilters).length > 0) {
                products = searchProducts(userMessage, extractedFilters);
                if (products.length > 0) {
                    response.content = `✅ Found ${products.length} products matching your criteria:\n`;
                    products.forEach((product, index) => {
                        response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
                        if (product.rating) response.content += ` ⭐${product.rating}/5`;
                        productCards.push(generateProductCard(product));
                    });
                } else {
                    response.content = "❌ No products found with those specifications. Try adjusting your criteria or ask for recommendations!";
                }
            } else {
                response.content = `I can filter by: 🎯\n• Categories: ${categories.join(', ')}\n• GPUs: ${gpuOptions.join(', ')}\n• Processors: ${processorOptions.join(', ')}\n• RAM: ${ramOptions.join(', ')}\n• Storage: ${storageOptions.join(', ')}\n• Screen Sizes: ${screenSizeOptions.join(', ')}\n\nWhat specific requirements do you have?`;
            }
        }
        // Product search by name
        else if (productNames.length > 0 || message.includes('find') || message.includes('search') || message.includes('looking for')) {
            products = searchProducts(userMessage);
            if (products.length > 0) {
                response.content = `🔍 Found ${products.length} products:\n`;
                products.forEach((product, index) => {
                    response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
                    if (product.rating) response.content += ` ⭐${product.rating}/5`;
                    productCards.push(generateProductCard(product));
                });
            } else {
                response.content = "❌ No products found. Try different keywords or ask for recommendations!";
            }
        }
        // Recommendations
        else if (message.includes('recommend') || message.includes('suggest') || message.includes('what should') || message.includes('best')) {
            products = generateRecommendations(userMessage);
            if (products.length > 0) {
                response.content = "🎯 Based on your needs, I recommend:\n";
                products.forEach((product, index) => {
                    response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()} - ${generateSalesPitch(product)}`;
                    productCards.push(generateProductCard(product));
                });
            } else {
                response.content = "I'd be happy to recommend products! Could you tell me what you're looking for? (gaming, business, creative work, budget, premium, etc.)";
            }
        }
        // Price inquiries
        else if (message.includes('price') || message.includes('how much') || message.includes('cost') || message.includes('₱')) {
            const productMatch = allItems.find(p =>
                productNames.some(name => p.name.toLowerCase().includes(name)) ||
                message.includes(p.name.toLowerCase())
            );

            if (productMatch) {
                response.content = `💰 The ${productMatch.name} is priced at ₱${productMatch.price.toLocaleString()}`;
                if (productMatch.oldPrice) {
                    response.content += ` (was ₱${productMatch.oldPrice.toLocaleString()}, save ₱${(productMatch.oldPrice - productMatch.price).toLocaleString()})`;
                }
                response.content += `. ${generateSalesPitch(productMatch)}`;
                productCards.push(generateProductCard(productMatch));
            } else {
                response.content = "I'm not sure which product you're asking about. Could you specify the exact product name?";
            }
        }
        // PC Building
        else if (message.includes('build') || message.includes('custom pc') || message.includes('pc build') || message.includes('assemble')) {
            const budget = extractBudget(message);
            let purpose = 'gaming';

            if (message.includes('workstation') || message.includes('professional')) purpose = 'workstation';
            if (message.includes('creative') || message.includes('design')) purpose = 'creative';
            if (message.includes('budget') || message.includes('cheap') || message.includes('economy')) purpose = 'budget';
            if (message.includes('stream') || message.includes('content')) purpose = 'streaming';

            if (budget) {
                const { build, totalPrice } = buildCompletePC(budget, purpose);
                pcBuild = generatePCBuildCard(build, totalPrice, purpose);
                response.content = `🛠️ Here's a ${purpose} PC build for ₱${budget.toLocaleString()}:\n\n`;

                Object.entries(build).forEach(([type, component]) => {
                    response.content += `• ${type.toUpperCase()}: ${component.name} - ₱${component.price.toLocaleString()}\n`;
                });

                response.content += `\n💵 Total: ₱${totalPrice.toLocaleString()}`;

                // Add build compatibility check
                const compatibility = checkBuildCompatibility(build);
                if (compatibility.issues.length > 0) {
                    response.content += `\n\n⚠️ Compatibility Notes:\n${compatibility.issues.join('\n')}`;
                }
            } else {
                response.content = "I'd love to help you build a custom PC! What's your budget and primary use? (gaming, creative work, streaming, etc.)";
            }
        }
        // Component recommendations
        else if (message.includes('cpu') || message.includes('gpu') || message.includes('ram') ||
            message.includes('motherboard') || message.includes('storage') || message.includes('psu') ||
            message.includes('power supply') || message.includes('case') || message.includes('cooler') ||
            message.includes('monitor') || message.includes('keyboard') || message.includes('mouse')) {

            let componentType = '';
            const componentMap = {
                'cpu': 'cpu', 'processor': 'cpu',
                'gpu': 'gpu', 'graphics': 'gpu', 'video card': 'gpu',
                'ram': 'ram', 'memory': 'ram',
                'motherboard': 'motherboard', 'mobo': 'motherboard',
                'storage': 'storage', 'ssd': 'storage', 'hdd': 'storage',
                'psu': 'power supply', 'power supply': 'power supply',
                'case': 'case', 'chassis': 'case',
                'cooler': 'cooler', 'heatsink': 'cooler',
                'monitor': 'monitor', 'display': 'monitor',
                'keyboard': 'keyboard', 'mouse': 'mouse'
            };

            Object.entries(componentMap).forEach(([key, value]) => {
                if (message.includes(key)) componentType = value;
            });

            const budget = extractBudget(message);
            let purpose = 'general';
            if (message.includes('gaming')) purpose = 'gaming';
            if (message.includes('workstation')) purpose = 'workstation';
            if (message.includes('budget')) purpose = 'budget';

            const recommendations = generatePCPartRecommendation(componentType, budget, purpose);

            if (recommendations.length > 0) {
                response.content = `💡 Top ${componentType.toUpperCase()} recommendations${budget ? ` under ₱${budget.toLocaleString()}` : ''}:\n\n`;
                recommendations.forEach((product, index) => {
                    response.content += `${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}\n`;
                    productCards.push(generateProductCard(product));
                });
            } else {
                response.content = `❌ No ${componentType} found matching your criteria. Try adjusting your budget or requirements.`;
            }
        }
        // Product comparison
        else if (message.includes('compare') || message.includes('vs') || message.includes('difference') || message.includes('versus')) {
            if (productNames.length >= 2) {
                const productsToCompare = productNames.map(name =>
                    allItems.find(p => p.name.toLowerCase().includes(name))
                ).filter(Boolean);

                if (productsToCompare.length >= 2) {
                    response.content = generateComparison(productsToCompare);
                    productsToCompare.forEach(product => {
                        productCards.push(generateProductCard(product));
                    });
                } else {
                    response.content = "I need at least two valid product names to compare. Which products would you like to compare?";
                }
            } else {
                response.content = "Please specify at least two products to compare (e.g., 'compare Product A vs Product B').";
            }
        }
        // Technical specifications
        else if (message.includes('spec') || message.includes('specs') || message.includes('technical') || message.includes('details')) {
            if (productNames.length > 0) {
                const product = allItems.find(p =>
                    p.name.toLowerCase().includes(productNames[0])
                );
                if (product) {
                    response.content = generateSpecifications(product);
                    productCards.push(generateProductCard(product));
                } else {
                    response.content = "I couldn't find that product. Could you specify the exact product name?";
                }
            } else {
                response.content = "Which product's specifications would you like to see?";
            }
        }
        // Budget recommendations
        else if (message.includes('budget') || message.includes('under') || message.includes('affordable') || message.includes('cheap')) {
            const budget = extractBudget(message) || 30000; // Default budget if not specified
            products = allItems.filter(p => p.price <= budget)
                .sort((a, b) => (b.rating || 0) - (a.rating || 0) || a.price - b.price)
                .slice(0, 5);

            if (products.length > 0) {
                response.content = `💸 Best products under ₱${budget.toLocaleString()}:\n`;
                products.forEach((product, index) => {
                    response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
                    if (product.rating) response.content += ` ⭐${product.rating}/5`;
                    productCards.push(generateProductCard(product));
                });
            } else {
                response.content = `No products found under ₱${budget.toLocaleString()}. Try a higher budget or ask for recommendations.`;
            }
        }
        // Series and features inquiry
        else if (message.includes('series') || message.includes('model') || message.includes('feature')) {
            const seriesItems = getSeriesItems();
            const matchingSeries = seriesItems.filter(series =>
                message.toLowerCase().includes(series.toLowerCase())
            );

            if (matchingSeries.length > 0) {
                products = allItems.filter(item =>
                    item.series && matchingSeries.some(series =>
                        item.series.toLowerCase().includes(series.toLowerCase())
                    )
                );
                if (products.length > 0) {
                    response.content = `📊 Products in ${matchingSeries.join(', ')} series:\n`;
                    products.forEach((product, index) => {
                        response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
                        productCards.push(generateProductCard(product));
                    });
                } else {
                    response.content = `No products found in the ${matchingSeries.join(', ')} series.`;
                }
            } else {
                response.content = `Available series: ${seriesItems.join(', ')}\n\nWhich series are you interested in?`;
            }
        }
        // Default response
        else {
            response.content = "I'm here to help you find the perfect tech products at TechnoBuild! 🚀 You can:\n• Ask about specific products\n• Get recommendations\n• Build custom PCs\n• Compare products\n• Filter by specifications\n\nWhat would you like to explore today?";
        }

        setIsTyping(false);
        return { response, productCards, pcBuild };
    };

    // Helper function for build compatibility checking
    const checkBuildCompatibility = (build) => {
        const issues = [];

        // Check CPU and motherboard compatibility
        if (build.cpu && build.motherboard) {
            const cpuSocket = build.cpu.specs?.socket;
            const moboSocket = build.motherboard.specs?.socket;
            if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
                issues.push(`⚠️ CPU socket (${cpuSocket}) doesn't match motherboard socket (${moboSocket})`);
            }
        }

        // Check RAM compatibility
        if (build.ram && build.motherboard) {
            const ramType = build.ram.specs?.type;
            const moboRamType = build.motherboard.specs?.memoryType;
            if (ramType && moboRamType && ramType !== moboRamType) {
                issues.push(`⚠️ RAM type (${ramType}) doesn't match motherboard support (${moboRamType})`);
            }
        }

        // Check power supply wattage
        if (build.powerSupply) {
            const psuWattage = parseInt(build.powerSupply.specs?.wattage) || 0;
            const estimatedPower = Object.values(build).reduce((total, component) => {
                return total + (component.specs?.tdp || component.specs?.powerConsumption || 0);
            }, 0);

            if (psuWattage < estimatedPower * 1.2) {
                issues.push(`⚠️ Power supply (${psuWattage}W) may be insufficient for estimated load (${Math.round(estimatedPower)}W)`);
            }
        }

        return { issues, isCompatible: issues.length === 0 };
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Get AI response
        const { response, productCards, pcBuild } = await enhancedProcessMessage(inputText);

        // Add AI response
        const botMessage = {
            id: Date.now() + 1,
            text: response.content,
            sender: 'bot',
            timestamp: new Date(),
            type: response.type
        };

        setMessages(prev => [...prev, botMessage]);

        // Add product cards if any
        if (productCards && productCards.length > 0) {
            productCards.forEach((card, index) => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 2 + index,
                    ...card,
                    sender: 'bot',
                }]);
            });
        }

        // Add PC build if any
        if (pcBuild) {
            setMessages(prev => [...prev, {
                id: Date.now() + 100,
                ...pcBuild,
                sender: 'bot',
            }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleProductAction = (action, product) => {
        let actionMessage = '';

        switch (action) {
            case 'view':
                actionMessage = `Viewing details for ${product.name}`;
                window.open(`/products/${product.id}`, '_blank');
                break;
            case 'buy':
                actionMessage = `Proceeding to buy ${product.name}`;
                console.log('Buy now:', product);
                break;
            case 'cart':
                actionMessage = `Added ${product.name} to cart`;
                console.log('Add to cart:', product);
                break;
            default:
                actionMessage = `Action performed on ${product.name}`;
        }

        // Add user action message
        const actionMessageObj = {
            id: Date.now(),
            text: actionMessage,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, actionMessageObj]);

        // Add bot confirmation
        const botConfirmation = {
            id: Date.now() + 1,
            text: `Great! I've processed your request for the ${product.name}. Is there anything else I can help you with?`,
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, botConfirmation]);
    };

    const handlePCBuildAction = (action, build, totalPrice) => {
        let actionMessage = '';

        switch (action) {
            case 'save':
                actionMessage = `Saving PC build configuration (₱${totalPrice.toLocaleString()})`;
                console.log('Saving build:', build);
                break;
            case 'customize':
                actionMessage = `Customizing PC build`;
                console.log('Customizing build:', build);
                break;
            case 'buy':
                actionMessage = `Proceeding to buy complete PC build`;
                console.log('Buying build:', build);
                break;
            default:
                actionMessage = `Action performed on PC build`;
        }

        const actionMessageObj = {
            id: Date.now(),
            text: actionMessage,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, actionMessageObj]);

        const botConfirmation = {
            id: Date.now() + 1,
            text: `Excellent choice! I've ${action}ed your PC build configuration totaling ₱${totalPrice.toLocaleString()}. Would you like to make any adjustments or see individual components?`,
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, botConfirmation]);
    };

    const toggleAIMode = () => {
        setUseGeminiAI(!useGeminiAI);
        const modeMessage = {
            id: Date.now(),
            text: `Switched to ${!useGeminiAI ? 'AI-powered' : 'rule-based'} mode`,
            sender: 'system',
            timestamp: new Date(),
            type: 'text'
        };
        setMessages(prev => [...prev, modeMessage]);
    };

    // Render PC Build component
    const renderPCBuild = (build, totalPrice, purpose) => {
        return (
            <div className={styles.pcBuild}>
                <h4>{purpose.charAt(0).toUpperCase() + purpose.slice(1)} PC Build - ₱{totalPrice.toLocaleString()}</h4>
                <div className={styles.buildComponents}>
                    {Object.entries(build).map(([type, component]) => (
                        <div key={type} className={styles.buildComponentCard}>
                            <div className={styles.componentImage}>
                                <img src={component.img} alt={component.name} />
                            </div>
                            <div className={styles.componentInfo}>
                                <h5>{type.toUpperCase()}</h5>
                                <p className={styles.componentName}>{component.name}</p>
                                <div className={styles.componentSpecs}>
                                    {component.specs && Object.entries(component.specs).slice(0, 2).map(([key, value]) => (
                                        <span key={key} className={styles.specItem}>{key}: {value}</span>
                                    ))}
                                </div>
                                <p className={styles.componentPrice}>₱{component.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.buildTotal}>
                    <strong>Total: ₱{totalPrice.toLocaleString()}</strong>
                </div>
                <div className={styles.buildActions}>
                    <button
                        className={styles.saveBuildButton}
                        onClick={() => handlePCBuildAction('save', build, totalPrice)}
                    >
                        Save Build
                    </button>
                    <button
                        className={styles.customizeButton}
                        onClick={() => handlePCBuildAction('customize', build, totalPrice)}
                    >
                        Customize
                    </button>
                    <button
                        className={styles.buyBuildButton}
                        onClick={() => handlePCBuildAction('buy', build, totalPrice)}
                    >
                        Buy Complete Build
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.aiAssistant}>
            <button
                className={styles.chatToggle}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>AI Assistant</span>
                <span>💬</span>
                <span className={styles.aiStatusIndicator} data-active={useGeminiAI}>
                    {useGeminiAI ? 'AI' : 'RB'}
                </span>
            </button>

            {isOpen && (
                <div className={styles.chatContainer}>
                    <div className={styles.chatHeader}>
                        <h3>TechnoBuild Shopping Assistant</h3>
                        <div className={styles.headerControls}>
                            <button
                                className={`${styles.aiToggle} ${useGeminiAI ? styles.aiMode : styles.ruleMode}`}
                                onClick={toggleAIMode}
                                aria-label="Toggle AI Mode"
                                type="button"
                            >
                                <div className={`${styles.toggleKnob} ${useGeminiAI ? styles.knobAI : styles.knobRule}`}>
                                    {useGeminiAI ? (
                                        <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="#0dcaf0">
                                            <path d="M12 2a5 5 0 00-5 5v3H5a3 3 0 00-3 3v7h6v2a2 2 0 004 0v-2h6v-7a3 3 0 00-3-3h-2V7a5 5 0 00-5-5z" />
                                        </svg>
                                    ) : (
                                        <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="#f8f9fa">
                                            <path d="M19.14 12.936a7.07 7.07 0 000-1.872l2.03-1.578a.5.5 0 00.12-.65l-1.924-3.328a.5.5 0 00-.607-.22l-2.39.96a7.11 7.11 0 00-1.62-.936l-.36-2.54a.5.5 0 00-.497-.422h-3.848a.5.5 0 00-.497.422l-.36 2.54a7.11 7.11 0 00-1.62.936l-2.39-.96a.5.5 0 00-.607.22L2.71 8.836a.5.5 0 00.12.65l2.03 1.578a7.07 7.07 0 000 1.872l-2.03 1.578a.5.5 0 00-.12.65l1.924 3.328a.5.5 0 00.607.22l2.39-.96c.495.392 1.04.715 1.62.936l.36 2.54a.5.5 0 00.497.422h3.848a.5.5 0 00.497-.422l.36-2.54c.58-.221 1.125-.544 1.62-.936l2.39.96a.5.5 0 00.607-.22l1.924-3.328a.5.5 0 00-.12-.65l-2.03-1.578zM12 15a3 3 0 110-6 3 3 0 010 6z" />
                                        </svg>
                                    )}
                                </div>
                            </button>

                            <button onClick={() => setIsOpen(false)}>×</button>
                        </div>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.message} ${message.sender === 'user' ? styles.userMessage :
                                    message.sender === 'system' ? styles.systemMessage : styles.botMessage
                                    }`}
                            >
                                {message.type === 'text' ? (
                                    <>
                                        <div className={styles.messageContent}>
                                            {message.text.split('\n').map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                        <span className={styles.timestamp}>
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </>
                                ) : message.type === 'productCard' ? (
                                    <div className={styles.productCard}>
                                        <div className={styles.productImage}>
                                            <img src={message.product.img} alt={message.product.name} />
                                        </div>
                                        <div className={styles.productInfo}>
                                            <h4>{message.product.name}</h4>
                                            {message.product.brand && (
                                                <p className={styles.productBrand}>{message.product.brand}</p>
                                            )}
                                            {message.product.description && (
                                                <p className={styles.productDescription}>{message.product.description}</p>
                                            )}
                                            <div className={styles.productPrice}>
                                                <span className={styles.currentPrice}>₱{message.product.price.toLocaleString()}</span>
                                                {message.product.oldPrice && (
                                                    <span className={styles.oldPrice}>₱{message.product.oldPrice.toLocaleString()}</span>
                                                )}
                                            </div>
                                            {message.product.rating && (
                                                <div className={styles.productRating}>
                                                    <span className={styles.ratingStars}>
                                                        {'★'.repeat(Math.floor(message.product.rating))}
                                                        {'☆'.repeat(5 - Math.floor(message.product.rating))}
                                                    </span>
                                                    <span className={styles.ratingText}>({message.product.reviews} reviews)</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.productActions}>
                                            <button
                                                className={styles.viewButton}
                                                onClick={() => handleProductAction('view', message.product)}
                                            >
                                                View Product
                                            </button>
                                            <button
                                                className={styles.cartButton}
                                                onClick={() => handleProductAction('cart', message.product)}
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                className={styles.buyButton}
                                                onClick={() => handleProductAction('buy', message.product)}
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    </div>
                                ) : message.type === 'pcBuild' ? (
                                    renderPCBuild(message.build, message.totalPrice, message.purpose)
                                ) : null}
                            </div>
                        ))}

                        {isTyping && (
                            <div className={styles.typingIndicator}>
                                <span>AI Assistant is typing</span>
                                <div className={styles.typingDots}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about products, get recommendations, build a PC..."
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping || !inputText.trim()}
                        >
                            Send
                        </button>
                    </div>

                    <div className={styles.quickSuggestions}>
                        <span>Quick questions:</span>
                        <button onClick={() => setInputText("Build a gaming PC under 50k")}>
                            Gaming PC Build
                        </button>
                        <button onClick={() => setInputText("Recommend a CPU for gaming")}>
                            CPU Recommendation
                        </button>
                        <button onClick={() => setInputText("Best GPU under 30k")}>
                            GPU Suggestion
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;