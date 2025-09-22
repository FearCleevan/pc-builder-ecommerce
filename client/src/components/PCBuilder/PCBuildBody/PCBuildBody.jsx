import React, { useState, useMemo } from 'react';
import AddComponentModal from '../Modal/AddComponentModal/AddComponentModal';
import styles from './PCBuildBody.module.css';

const PCBuildBody = ({
    selectedComponents,
    onComponentSelect,
    onComponentRemove,
    onCompareNavigate
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComponentType, setSelectedComponentType] = useState(null);

    const components = useMemo(() => [
        {
            id: 'case',
            name: 'Case',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15">
                    <path d="M12.64 24.59c-.3-.28-.47-.68-.47-1.09V2.56c-2.38.18-4.26 2.15-4.26 4.58v35.71a4.6 4.6 0 0 0 4.6 4.6h3.13V27.41l-3-2.82Zm2.53-22.04v20.3l3 2.82c.3.28.47.68.47 1.09v20.69h12.72V26.76c0-.41.17-.81.47-1.09l3-2.82V2.55H15.17ZM25 38.84c-1.42 0-2.56-1.15-2.56-2.56s1.14-2.56 2.56-2.56 2.56 1.15 2.56 2.56-1.15 2.56-2.56 2.56Zm5.48-21.08H19.76c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h10.72c.83 0 1.5.68 1.5 1.5s-.67 1.5-1.5 1.5Zm0-6.7H19.76c-.83 0-1.5-.68-1.5-1.5s.67-1.5 1.5-1.5h10.72c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Zm7.35-8.5V23.5c0 .41-.18.81-.48 1.09l-2.99 2.82v20.04h3.12a4.6 4.6 0 0 0 4.6-4.6V7.14c0-2.42-1.87-4.4-4.25-4.58Z" fill="#000"></path>
                </svg>
            ),
            buttonStyle: 'accent'
        },
        {
            id: 'cpu',
            name: 'CPU',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15">
                    <path d="M15.74 3.03c1.52 0 2.76 1.24 2.76 2.76v3.12h-5.51V5.79c0-1.52 1.24-2.76 2.76-2.76ZM25 3.03c1.52 0 2.76 1.24 2.76 2.76v3.12h-5.51V5.79c0-1.52 1.24-2.76 2.76-2.76ZM34.26 3.03c1.52 0 2.76 1.24 2.76 2.76v3.12h-5.51V5.79c0-1.52 1.24-2.76 2.76-2.76ZM12.98 41.1h5.51v3.12c0 1.52-1.24 2.76-2.76 2.76-1.52 0-2.76-1.24-2.76-2.76V41.1ZM22.24 41.1h5.51v3.12c0 1.52-1.24 2.76-2.76 2.76-1.52 0-2.76-1.24-2.76-2.76V41.1ZM31.51 41.1h5.51v3.12c0 1.52-1.24 2.76-2.76 2.76-1.52 0-2.76-1.24-2.76-2.76V41.1ZM46.97 15.73c0 1.52-1.24 2.76-2.76 2.76h-3.12v-5.51h3.12c1.52 0 2.76 1.24 2.76 2.76ZM46.97 25c0 1.52-1.24 2.76-2.76 2.76h-3.12v-5.51h3.12c1.52 0 2.76 1.24 2.76 2.76ZM46.97 34.26c0 1.52-1.24 2.76-2.76 2.76h-3.12v-5.51h3.12c1.52 0 2.76 1.24 2.76 2.76ZM8.9 12.98v5.51H5.78c-1.52 0-2.76-1.24-2.76-2.76 0-1.52 1.24-2.76 2.76-2.76H8.9ZM8.91 22.24v5.51H5.79c-1.52 0-2.76-1.24-2.76-2.76 0-1.52 1.24-2.76 2.76-2.76h3.12ZM8.9 31.51v5.51H5.78c-1.52 0-2.76-1.24-2.76-2.76 0-1.52 1.24-2.76 2.76-2.76H8.9Z" fill="#424242"></path>
                    <path d="M32.99 42.29H17c-5.12 0-9.29-4.17-9.29-9.29V17.01c0-5.12 4.17-9.29 9.29-9.29h15.99c5.12 0 9.29 4.17 9.29 9.29V33c0 5.12-4.17 9.29-9.29 9.29ZM17.01 12.71c-2.37 0-4.29 1.93-4.29 4.29v15.99c0 2.37 1.93 4.29 4.29 4.29H33c2.37 0 4.29-1.93 4.29-4.29V17c0-2.37-1.93-4.29-4.29-4.29H17.01Z" fill="#424242"></path>
                    <rect width="17.16" height="17.16" x="16.42" y="16.42" fill="#424242" rx="2.51" ry="2.51"></rect>
                </svg>
            )
        },
        {
            id: 'motherboard',
            name: 'Motherboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><rect width="9.39" height="9.39" x="12.93" y="13.79" fill="#424242" rx="1.77" ry="1.77"></rect><path d="M41.97 4H8.02A4.02 4.02 0 0 0 4 8.02v33.95C4 44.2 5.8 46 8.02 46h33.95c2.22 0 4.03-1.8 4.03-4.03V8.02C46 5.8 44.19 4 41.97 4ZM9.59 17.21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h.56a4.756 4.756 0 0 1 3.2-3.2v-.56c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.34h2.55v-.34c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.56c1.54.46 2.74 1.66 3.2 3.2h.56c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-.34v2.55h.34c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-.56a4.756 4.756 0 0 1-3.2 3.2v.56c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-.34h-2.55v.34c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-.56a4.756 4.756 0 0 1-3.2-3.2h-.56c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h.34v-2.55h-.34Zm16.88 24H9.59c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h16.88c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Zm5.17-30.76c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v21.02c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V10.45Zm8.09 30.76h-6.52c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h6.52c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Zm1.5-9.74c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V10.45c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v21.02Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'gpu',
            name: 'GPU',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M5.18 46.87c-1.1 0-2-.9-2-2V7.13h-.73c-1.1 0-2-.9-2-2s.9-2 2-2h2.73c1.1 0 2 .9 2 2v39.74c0 1.1-.9 2-2 2Z" fill="#424242"></path><path d="M42.27 9.56H5.17v25.92h37.1c2.92 0 5.28-2.37 5.28-5.28V14.85c0-2.92-2.36-5.29-5.28-5.29ZM15.73 31c-4.68 0-8.49-3.8-8.49-8.48s3.81-8.48 8.49-8.48 8.48 3.8 8.48 8.48S20.4 31 15.73 31Zm19.75 0C30.81 31 27 27.2 27 22.52s3.81-8.48 8.48-8.48 8.49 3.8 8.49 8.48S40.16 31 35.48 31Z" fill="#424242"></path><circle cx="15.73" cy="22.52" r="4.32" fill="#424242"></circle><circle cx="35.48" cy="22.52" r="4.32" fill="#424242"></circle><path d="M14.33 41.98h-2.94c-1.1 0-2-.9-2-2s.9-2 2-2h2.94c1.1 0 2 .9 2 2s-.9 2-2 2ZM32.11 41.98h-11.9c-1.1 0-2-.9-2-2s.9-2 2-2h11.9c1.1 0 2 .9 2 2s-.9 2-2 2Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'ram',
            name: 'RAM',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M11.02 17.57h27.95v14.85H11.02z" fill="#424242"></path><path d="M41.43 10.01h-.15V7.7a2.5 2.5 0 0 0-5 0v2.31h-4.19V7.7a2.5 2.5 0 0 0-5 0v2.31H22.9V7.7a2.5 2.5 0 0 0-5 0v2.31h-4.19V7.7c0-1.38-1.11-2.5-2.5-2.5s-2.5 1.12-2.5 2.5v2.31h-.15a4.6 4.6 0 0 0-4.6 4.6v20.78a4.6 4.6 0 0 0 4.6 4.6h.15v2.31a2.5 2.5 0 0 0 5 0v-2.31h4.19v2.31a2.5 2.5 0 0 0 5 0v-2.31h4.19v2.31a2.5 2.5 0 0 0 5 0v-2.31h4.19v2.31a2.5 2.5 0 0 0 5 0v-2.31h.15a4.6 4.6 0 0 0 4.6-4.6V14.61a4.6 4.6 0 0 0-4.6-4.6Zm.54 23.49c0 1.06-.86 1.92-1.93 1.92H9.95a1.93 1.93 0 0 1-1.93-1.92v-17c0-1.06.87-1.93 1.93-1.93h30.09c1.07 0 1.93.87 1.93 1.93v17Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'cpuCooler',
            name: 'CPU Cooler',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M4.84 7.98h40.32c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H4.84c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5ZM4.84 35.84c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h11.3c2.56 1.65 5.6 2.61 8.86 2.61s6.3-.97 8.86-2.61h11.3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-7.81c.85-.97 1.59-2.02 2.2-3.17h5.61c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-4.39c.3-1.02.51-2.08.61-3.17h3.78c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-3.78c-.1-1.09-.31-2.15-.61-3.17h4.39c.83 0 1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5h-5.61c-.61-1.15-1.35-2.21-2.21-3.18h7.82c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H33.85c-2.56-1.64-5.59-2.6-8.85-2.6s-6.29.96-8.85 2.6H4.84c-.83 0-1.5.68-1.5 1.5s.67 1.5 1.5 1.5h7.82c-.85.97-1.6 2.03-2.21 3.18H4.83c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h4.39c-.3 1.02-.51 2.08-.61 3.17H4.83c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3.78c.1 1.09.31 2.15.61 3.17H4.83c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.62c.61 1.15 1.35 2.2 2.2 3.17H4.83ZM38.45 25c0 7.42-6.04 13.45-13.45 13.45S11.55 32.41 11.55 25 17.59 11.55 25 11.55 38.45 17.59 38.45 25ZM45.16 42.02H4.84c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h40.32c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5Z" fill="#424242"></path><path d="M25 32.05c3.9 0 7.05-3.16 7.05-7.05s-3.16-7.05-7.05-7.05-7.05 3.16-7.05 7.05 3.16 7.05 7.05 7.05Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'storage',
            name: 'Storage',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="16" height="12.8"><path d="M36.78 2.9H13.23C11 2.9 9.2 4.7 9.2 6.92v36.15c0 2.23 1.8 4.03 4.03 4.03h23.55c2.23 0 4.03-1.8 4.03-4.03V6.92c0-2.22-1.8-4.02-4.03-4.02Zm-22.7 2.86c1.17 0 2.12.95 2.12 2.13s-.95 2.12-2.12 2.12-2.12-.95-2.12-2.12.95-2.13 2.12-2.13Zm0 38.47a2.121 2.121 0 0 1 0-4.24 2.121 2.121 0 0 1 0 4.24ZM30.7 29.66l-3.23 6.15c-.53.99-1.46 1.72-2.55 1.98-.3.07-.61.1-.91.1-.8 0-1.6-.24-2.27-.72-.91-.66-1.5-1.67-1.61-2.8-.11-1.12.27-2.23 1.04-3.05l.58-.62c-4.75-1.4-8.21-5.8-8.21-11 0-6.33 5.13-11.46 11.46-11.46s11.47 5.13 11.47 11.46c0 4.26-2.32 7.98-5.77 9.96Zm5.23 14.57a2.121 2.121 0 0 1 0-4.24 2.121 2.121 0 0 1 0 4.24Zm0-34.22c-1.17 0-2.12-.95-2.12-2.12s.95-2.13 2.12-2.13 2.12.95 2.12 2.13-.95 2.12-2.12 2.12Z" fill="#424242"></path><path d="M25 23.17c1.92 0 3.47-1.55 3.47-3.47s-1.55-3.47-3.47-3.47-3.47 1.55-3.47 3.47 1.55 3.47 3.47 3.47ZM29.55 25.34l-5.45 5.79-1.47 1.56c-.38.4-.57.94-.51 1.49.05.54.34 1.04.79 1.36.44.32 1.01.43 1.54.3.54-.12.99-.48 1.25-.96l2.13-4.06 2.56-4.88a.53.53 0 0 0-.16-.67.52.52 0 0 0-.68.07Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'powerSupply',
            name: 'Power Supply',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M41.73 4H8.26C6.04 4 4.24 5.81 4.24 8.03v29.82c0 2.22 1.8 4.02 4.02 4.02h22v2.72c0 .73.59 1.31 1.31 1.31h6.85c.73 0 1.31-.59 1.31-1.31v-2.72h1.99c2.22 0 4.02-1.8 4.02-4.02V8.03c0-2.22-1.8-4.03-4.02-4.03ZM26.5 8.28c6.94.7 12.46 6.22 13.16 13.16h-2.84c-.67-5.37-4.95-9.65-10.32-10.32V8.28Zm0 5.87c3.72.63 6.66 3.57 7.29 7.29h-3.22a5.74 5.74 0 0 0-4.07-4.06v-3.23Zm0 14.36a5.77 5.77 0 0 0 4.07-4.07h3.22a8.927 8.927 0 0 1-7.29 7.29v-3.22ZM9.01 6.83a2.121 2.121 0 0 1 0 4.24 2.121 2.121 0 0 1 0-4.24Zm0 32.22a2.121 2.121 0 0 1 0-4.24 2.121 2.121 0 0 1 0 4.24ZM23.5 37.6c-6.94-.7-12.46-6.22-13.16-13.16h2.84c.67 5.37 4.94 9.65 10.32 10.32v2.84Zm0-5.87a8.927 8.927 0 0 1-7.29-7.29h3.22a5.736 5.736 0 0 0 4.07 4.07v3.22Zm0-14.35a5.706 5.706 0 0 0-4.07 4.06h-3.22a8.927 8.927 0 0 1 7.29-7.29v3.23Zm0-6.26c-5.38.67-9.65 4.95-10.32 10.32h-2.84c.7-6.94 6.22-12.46 13.16-13.16v2.84Zm3 23.64c5.37-.67 9.65-4.95 10.32-10.32h2.84c-.7 6.94-6.22 12.46-13.16 13.16v-2.84Zm14.49 4.29c-1.18 0-2.13-.95-2.13-2.12s.95-2.12 2.13-2.12 2.12.95 2.12 2.12-.95 2.12-2.12 2.12Zm0-27.98c-1.18 0-2.13-.95-2.13-2.12s.95-2.12 2.13-2.12 2.12.95 2.12 2.12-.95 2.12-2.12 2.12Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'caseFan',
            name: 'Case Fan',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M41.73 4.24H8.27a4.03 4.03 0 0 0-4.03 4.03v33.46c0 2.22 1.81 4.03 4.03 4.03h33.46a4.03 4.03 0 0 0 4.03-4.03V8.27c0-2.23-1.8-4.03-4.03-4.03ZM10.01 7.89a2.121 2.121 0 0 1 0 4.24 2.121 2.121 0 0 1 0-4.24Zm0 34.22a2.121 2.121 0 0 1 0-4.24 2.121 2.121 0 0 1 0 4.24ZM25 40.05c-8.31 0-15.05-6.74-15.05-15.05S16.69 9.94 25 9.94 40.06 16.68 40.06 25 33.32 40.05 25 40.05Zm14.99 2.06a2.121 2.121 0 0 1 0-4.24 2.121 2.121 0 0 1 0 4.24Zm0-29.98a2.121 2.121 0 0 1 0-4.24 2.121 2.121 0 0 1 0 4.24Z" fill="#424242"></path><path d="M25 18.96c-3.34 0-6.04 2.7-6.04 6.04s2.7 6.04 6.04 6.04 6.04-2.7 6.04-6.04-2.7-6.04-6.04-6.04Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'monitor',
            name: 'Monitor',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M41.95 3.99H8.05a4.03 4.03 0 0 0-4.03 4.03V29.1c0 2.22 1.81 4.02 4.03 4.02h33.9c2.23 0 4.03-1.8 4.03-4.02V8.02c0-2.23-1.8-4.03-4.03-4.03ZM22.76 8.96l-5.04 19.75c-.12.51-.58.86-1.1.86H9.68a2.03 2.03 0 0 1-2.03-2.02V9.57c0-1.12.91-2.03 2.03-2.03h11.97c.74 0 1.29.7 1.11 1.42ZM33.81 41.7h-3v-4.25c0-1.22-.99-2.22-2.22-2.22h-7.18c-1.22 0-2.22.99-2.22 2.22v4.25h-3c-1.19 0-2.15.96-2.15 2.15S15 46 16.19 46H33.8c1.19 0 2.15-.96 2.15-2.15s-.96-2.15-2.15-2.15Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'mouse',
            name: 'Mouse',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M30.28 4.24H19.71c-5.58 0-10.1 4.52-10.1 10.11v9.15h30.78v-9.15c0-5.59-4.53-10.11-10.11-10.11ZM28 16.06c0 1.66-1.34 3-3 3s-3-1.34-3-3v-5.01c0-1.66 1.34-3 3-3s3 1.34 3 3v5.01ZM9.61 26.5h30.78v3.87c0 8.5-6.89 15.39-15.39 15.39S9.61 38.87 9.61 30.37V26.5Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'keyboard',
            name: 'Keyboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M41.95 14.03H27.51V5.28a2.5 2.5 0 0 0-5 0v8.75H8.05c-2.22 0-4.03 1.8-4.03 4.02v22.64c0 2.22 1.81 4.02 4.03 4.02h33.9c2.23 0 4.03-1.8 4.03-4.02V18.05c0-2.22-1.8-4.02-4.03-4.02Zm-15.56 5.5c0-1.31 1.06-2.37 2.37-2.37h2.1c1.31 0 2.37 1.06 2.37 2.37v1.56c0 1.31-1.06 2.37-2.37 2.37h-2.1c-1.31 0-2.37-1.06-2.37-2.37v-1.56Zm-.44 9.06v1.56c0 1.31-1.06 2.37-2.37 2.37h-2.1c-1.31 0-2.38-1.06-2.38-2.37v-1.56c0-1.31 1.07-2.37 2.38-2.37h2.1c1.31 0 2.37 1.06 2.37 2.37Zm-9.17-9.06c0-1.31 1.07-2.37 2.38-2.37h2.1c1.31 0 2.37 1.06 2.37 2.37v1.56c0 1.31-1.06 2.37-2.37 2.37h-2.1c-1.31 0-2.38-1.06-2.38-2.37v-1.56Zm-9.6 0a2.37 2.37 0 0 1 2.38-2.37h2.09c1.31 0 2.38 1.06 2.38 2.37v1.56c0 1.31-1.07 2.37-2.38 2.37H9.56a2.37 2.37 0 0 1-2.38-2.37v-1.56Zm6.85 19.68c0 1.31-1.07 2.38-2.38 2.38H9.56a2.38 2.38 0 0 1-2.38-2.38v-1.56a2.37 2.37 0 0 1 2.38-2.37h2.09c1.31 0 2.38 1.06 2.38 2.37v1.56Zm2.31-9.06c0 1.31-1.07 2.37-2.38 2.37h-4.4a2.37 2.37 0 0 1-2.38-2.37v-1.56a2.37 2.37 0 0 1 2.38-2.37h4.4c1.31 0 2.38 1.06 2.38 2.37v1.56Zm16.89 9.06c0 1.31-1.06 2.38-2.37 2.38h-8.59c-.17 0-.34-.02-.5-.06-.16.04-.33.06-.51.06h-2.1c-1.31 0-2.38-1.07-2.38-2.38v-1.56c0-1.31 1.07-2.37 2.38-2.37h2.1c.18 0 .35.02.51.06.16-.04.33-.06.5-.06h8.59c1.31 0 2.37 1.06 2.37 2.37v1.56Zm2.32-9.06c0 1.31-1.06 2.37-2.37 2.37h-2.1c-1.31 0-2.37-1.06-2.37-2.37v-1.56c0-1.31 1.06-2.37 2.37-2.37h2.1c1.31 0 2.37 1.06 2.37 2.37v1.56Zm7.28 9.06c0 1.31-1.06 2.38-2.37 2.38h-2.1c-1.31 0-2.37-1.07-2.37-2.38v-1.56c0-1.31 1.06-2.37 2.37-2.37h2.1c1.31 0 2.37 1.06 2.37 2.37v1.56Zm0-8.5c0 1-.81 1.81-1.81 1.81H39.9c-1 0-1.81-.81-1.81-1.81v-2.68c0-1 .81-1.81 1.81-1.81h1.12c1 0 1.81.81 1.81 1.81v2.68Zm0-9.62c0 1.31-1.06 2.37-2.37 2.37h-2.1c-1.31 0-2.37-1.06-2.37-2.37v-1.56c0-1.31 1.06-2.37 2.37-2.37h2.1c1.31 0 2.37 1.06 2.37 2.37v1.56Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'speaker',
            name: 'Speaker',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M36.58 2.55H13.41c-2.54 0-4.6 2.05-4.6 4.59v35.71a4.6 4.6 0 0 0 4.6 4.6h23.17a4.6 4.6 0 0 0 4.6-4.6V7.14c0-2.54-2.06-4.59-4.6-4.59ZM25 8.23c2.91 0 5.28 2.36 5.28 5.28s-2.37 5.28-5.28 5.28-5.29-2.36-5.29-5.28S22.08 8.23 25 8.23Zm0 34.9c-5.32 0-9.63-4.31-9.63-9.62s4.31-9.63 9.63-9.63 9.62 4.31 9.62 9.63-4.31 9.62-9.62 9.62Z" fill="#424242"></path><path d="M25 28.23c-2.92 0-5.28 2.36-5.28 5.28s2.37 5.28 5.28 5.28 5.28-2.36 5.28-5.28-2.37-5.28-5.28-5.28Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'headphones',
            name: 'Headphones',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="m43.69 32.35-.21-.04.38-1.79c.32-1.49-.63-2.95-2.12-3.27l-2.53-.54v-6.37c0-7.84-6.38-14.22-14.22-14.22S10.77 12.5 10.77 20.34v6.37l-2.53.54a2.753 2.753 0 0 0-2.12 3.27l.38 1.79-.21.04a2.753 2.753 0 0 0-2.12 3.27l.79 3.7a2.753 2.753 0 0 0 3.27 2.12l.21-.04.38 1.79a2.753 2.753 0 0 0 3.27 2.12L18.24 44a2.753 2.753 0 0 0 2.12-3.27l-2.7-12.68a2.751 2.751 0 0 0-1.9-2.05v-5.67c0-5.08 4.14-9.22 9.22-9.22s9.22 4.14 9.22 9.22V26c-.93.28-1.68 1.04-1.9 2.05l-2.7 12.68c-.32 1.49.63 2.95 2.12 3.27l6.15 1.31c1.49.32 2.95-.63 3.27-2.12l.38-1.79.21.04c1.49.32 2.95-.63 3.27-2.12l.79-3.7c.32-1.49-.63-2.95-2.12-3.27Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'microphone',
            name: 'Microphone',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M41.17 40.1h-1.95s.01-.09.01-.14c0-2.31-1.73-4.21-3.97-4.5L28.68 15.2a4.513 4.513 0 0 0-3.34-3.01l-5.17-1.11a2.984 2.984 0 0 0-2.23-2.01l-8.5-1.78a3 3 0 0 0-1.23 5.87l8.5 1.78c.21.04.41.06.62.06.86 0 1.66-.37 2.22-.99l5.16 1.1c.52.11.95.49 1.11 1l6.48 19.95c-1.31.8-2.19 2.23-2.19 3.88 0 .05.01.09.01.14H14.3a2.5 2.5 0 0 0 0 5h26.85a2.5 2.5 0 0 0 0-5Z" fill="#424242"></path></svg>
            )
        },
        {
            id: 'webcam',
            name: 'Webcam',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="15"><path d="M25 10.65c-4.48 0-8.13 3.65-8.13 8.14s3.65 8.14 8.13 8.14 8.14-3.65 8.14-8.14-3.65-8.14-8.14-8.14Zm-1.97 9.3c-1.74 0-3.14-1.41-3.14-3.14s1.4-3.14 3.14-3.14 3.13 1.41 3.13 3.14-1.4 3.14-3.13 3.14Z" fill="#424242"></path><path d="M41.73 4.03H8.27c-2.22 0-4.03 1.8-4.03 4.02v21.48c0 2.22 1.81 4.03 4.03 4.03H22.5v5.94c0 .07.01.13.02.2h-4.74c-1.89 0-3.43 1.54-3.43 3.43s1.54 3.43 3.43 3.43h14.44c1.89 0 3.43-1.54 3.43-3.43s-1.54-3.43-3.43-3.43h-4.74c0-.07.02-.13.02-.2v-5.94h14.23a4.03 4.03 0 0 0 4.03-4.03V8.05c0-2.22-1.8-4.02-4.03-4.02ZM9.51 11.62c-1.26 0-2.29-1.03-2.29-2.3s1.03-2.29 2.29-2.29 2.3 1.03 2.3 2.29-1.03 2.3-2.3 2.3ZM27.5 29.64c-.8.19-1.64.29-2.5.29s-1.7-.1-2.5-.29c-4.94-1.13-8.63-5.57-8.63-10.85 0-6.14 4.99-11.14 11.13-11.14s11.14 5 11.14 11.14c0 5.28-3.7 9.72-8.64 10.85Z" fill="#424242"></path></svg>
            )
        },
    ], [])

    const handleComponentClick = (component) => {
        setSelectedComponentType(component);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedComponentType(null);
    };

    const handleComponentSelect = (componentData) => {
        if (selectedComponentType) {
            onComponentSelect(componentData, selectedComponentType.id);
        }
        handleCloseModal();
    };

    const handleRemoveComponent = (componentId) => {
        onComponentRemove(componentId);
    };

    const handleRepickComponent = (component, e) => {
        e.stopPropagation();
        setSelectedComponentType(component);
        setIsModalOpen(true);
    };

    // Determine which component should have the accent button
    const getNextComponentToSelect = () => {
        const componentIds = components.map(c => c.id);
        for (const id of componentIds) {
            if (!selectedComponents[id]) {
                return id;
            }
        }
        return null;
    };

    const nextComponentId = getNextComponentToSelect();
    const hasSelectedComponents = Object.keys(selectedComponents).length > 0;

    return (
        <>
            <table className={styles.table}>
                {hasSelectedComponents && (
                    <thead className={styles.tableHeader}>
                        <tr className={styles.headerRow}>
                            <th className={styles.headerCell}>Component</th>
                            <th className={styles.headerCell}>Image</th>
                            <th className={styles.headerCell}>Name</th>
                            <th className={styles.headerCell}>Stock</th>
                            <th className={styles.headerCell}>Price</th>
                            <th className={styles.headerCell}>Buy</th>
                            <th className={styles.headerCell}>Actions</th>
                        </tr>
                    </thead>
                )}
                <tbody className={styles.tbody}>
                    {components.map((component, index) => {
                        const isSelected = !!selectedComponents[component.id];
                        const shouldShowAccent = component.id === nextComponentId;
                        const selectedData = selectedComponents[component.id];

                        return (
                            <tr key={index} className={`${styles.componentRow} ${isSelected ? styles.selectedRow : ''}`}>
                                {isSelected ? (
                                    <>
                                        <td className={styles.componentNameCell}>
                                            <div className={styles.componentNameWrapper}>
                                                <p className={styles.componentCategory}>{component.name}</p>
                                            </div>
                                        </td>
                                        <td className={styles.imageCell}>
                                            <div className={styles.componentImage}>
                                                <img src={selectedData.image || selectedData.SampleImg || "/src/assets/Laptop1.png"} alt={selectedData.name} />
                                                {selectedData.has3D && (
                                                    <div className={styles.badge3D}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"></path>
                                                            <path d="m15.194 13.707 3.814 1.86-1.86 3.814"></path>
                                                            <path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"></path>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className={styles.nameCell}>
                                            <div className={styles.selectedComponentInfo}>
                                                <h3 className={styles.componentNameText}>{selectedData.name}</h3>
                                            </div>
                                        </td>
                                        <td className={styles.stockCell}>
                                            <span className={styles.inStock}>{selectedData.stock || "In stock"}</span>
                                        </td>
                                        <td className={styles.priceCell}>
                                            <div className={styles.priceWrapper}>
                                                <p className={styles.price}>₱{selectedData.price}</p>
                                            </div>
                                        </td>
                                        <td className={styles.buyCell}>
                                            <button className={styles.buyButton}>
                                                Buy
                                            </button>
                                        </td>
                                        <td className={styles.actionCell}>
                                            <div className={styles.actionButtons}>
                                                <button
                                                    className={styles.repickButton}
                                                    onClick={(e) => handleRepickComponent(component, e)}
                                                    title="Choose different component"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M8 3 4 7l4 4"></path>
                                                        <path d="M4 7h16"></path>
                                                        <path d="m16 21 4-4-4-4"></path>
                                                        <path d="M20 17H4"></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    className={styles.removeButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveComponent(component.id);
                                                    }}
                                                    title="Remove component"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 6 6 18"></path>
                                                        <path d="m6 6 12 12"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td colSpan="7" className={styles.componentCell}>
                                            <div
                                                className={styles.componentItem}
                                                onClick={() => handleComponentClick(component)}
                                            >
                                                <p className={styles.componentName}>
                                                    {component.icon}
                                                    {component.name}
                                                </p>
                                                <div className={styles.buttonWrapper}>
                                                    <button className={shouldShowAccent ? styles.accentButton : styles.defaultButton}>
                                                        <span className={styles.buttonIcon}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M5 12h14"></path>
                                                                <path d="M12 5v14"></path>
                                                            </svg>
                                                        </span>
                                                        <span>Add {component.name}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <AddComponentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSelect={handleComponentSelect}
                componentType={selectedComponentType}
                onCompareNavigate={onCompareNavigate}
            />
        </>
    );
};

export default PCBuildBody;