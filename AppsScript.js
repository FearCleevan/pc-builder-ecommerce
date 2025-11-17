function transferAndCleanData() {
  try {
    console.log('Starting data transfer process...');

    // SOURCE 1: Original Masterlist (Uncleaned) - Sheet1
    const source1 = {
      id: '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA',
      sheetName: 'Sheet1',
      type: 'sheet1'
    };

    // SOURCE 2: Restaurant Sheet
    const source2 = {
      id: '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA',
      sheetName: 'Restaurant',
      type: 'restaurant'
    };

    // SOURCE 3: Sheet3
    const source3 = {
      id: '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA',
      sheetName: 'Sheet3',
      type: 'sheet3'
    };

    // SOURCE 4: USA Sheet
    const source4 = {
      id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc',
      sheetName: 'USA',
      type: 'usa'
    };

    // SOURCE 5: CANADA Sheet
    const source5 = {
      id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc',
      sheetName: 'CANADA',
      type: 'canada'
    };

    // SOURCE 6: Outside US/Can Sheet
    const source6 = {
      id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc',
      sheetName: 'Outside US/Can',
      type: 'outsideUSCan'
    };

    // SOURCE 7: Car rentals Sheet
    const source7 = {
      id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc',
      sheetName: 'Car rentals',
      type: 'carRentals'
    };

    // SOURCE 8: Illinois Sheet
    const source8 = {
      id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg',
      sheetName: 'Illinois',
      type: 'illinois'
    };

    // SOURCE 9: Whole US
    const source9 = {
      id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg',
      sheetName: 'Whole US',
      type: 'wholeUS'
    };

    // SOURCE 10: 1m Sheet
    const source10 = {
      id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg',
      sheetName: '1m',
      type: 'oneM'
    };

    // SOURCE 11: Restaurants Clean Sheet
    const source11 = {
      id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg',
      sheetName: 'Restaurants Clean',
      type: 'restaurantsClean'
    };

    // SOURCE 12: Restaurant Dups Sheet
    const source12 = {
      id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg',
      sheetName: 'Restaurant Dups',
      type: 'restaurantDups'
    };

    // SOURCE 13: New Prio Rest Sheet
    const source13 = {
      id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg',
      sheetName: 'New Prio Rest',
      type: 'newPrioRest'
    };

    // SOURCE 14: New Sheet1 from different spreadsheet
    const source14 = {
      id: '1vgLp6ebl35x36GFbCL6pFePED-InewXqFH0wxYKoyak',
      sheetName: 'Sheet1',
      type: 'sheet1New'
    };

    // SOURCE 15: Sheet2 from different spreadsheet
    const source15 = {
      id: '1vgLp6ebl35x36GFbCL6pFePED-InewXqFH0wxYKoyak',
      sheetName: 'Sheet2',
      type: 'sheet2New'
    };

    const source16 = {
      id: '1bHEZBTIqyp3jg_XIZ0V-YmA0pqErauGuacMJyd4iaQU',
      sheetName: 'Sheet1',
      type: 'sheet1Second'
    };

    // SOURCE 17: NEW TARGETS Sheet
    const source17 = {
      id: '1bHEZBTIqyp3jg_XIZ0V-YmA0pqErauGuacMJyd4iaQU',
      sheetName: 'NEW TARGETS',
      type: 'newTargets'
    };

    // Destination spreadsheet (Cleaned Masterlist)
    const destSpreadsheetId = '18m5GMfnLA4VNtCWkXpSTkXX-dwpwwstYOImaPOQuR4g';
    const destSheetName = 'Paul List';

    // Determine which source to use - default to source1 (Sheet1) for now
    let selectedSource = source1;

    console.log('Selected source:', selectedSource.type, 'Sheet:', selectedSource.sheetName);

    // Open spreadsheets and sheets
    const sourceSS = SpreadsheetApp.openById(selectedSource.id);
    const destSS = SpreadsheetApp.openById(destSpreadsheetId);
    const sourceSheet = sourceSS.getSheetByName(selectedSource.sheetName);
    const destSheet = destSS.getSheetByName(destSheetName);

    if (!sourceSheet) {
      throw new Error('Source sheet not found: ' + selectedSource.sheetName);
    }
    if (!destSheet) {
      throw new Error('Destination sheet not found: ' + destSheetName);
    }

    console.log('Reading source data...');

    // Get all data from source sheet
    const sourceData = sourceSheet.getDataRange().getValues();
    const sourceHeaders = sourceData[0];

    console.log('Source headers:', sourceHeaders);
    console.log('Source data rows:', sourceData.length - 1);

    // Get headers from destination sheet
    const destHeadersRange = destSheet.getRange(1, 1, 1, destSheet.getLastColumn());
    const destHeaders = destHeadersRange.getValues()[0];

    console.log('Destination headers:', destHeaders);

    // Create mapping based on source type
    let columnMapping;
    switch (selectedSource.type) {
      case 'sheet1':
        columnMapping = createSheet1Mapping(sourceHeaders, destHeaders);
        break;
      case 'restaurant':
        columnMapping = createRestaurantMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet3':
        columnMapping = createSheet3Mapping(sourceHeaders, destHeaders);
        break;
      case 'usa':
        columnMapping = createUSAMapping(sourceHeaders, destHeaders);
        break;
      case 'canada':
        columnMapping = createCanadaMapping(sourceHeaders, destHeaders);
        break;
      case 'outsideUSCan':
        columnMapping = createOutsideUSCanMapping(sourceHeaders, destHeaders);
        break;
      case 'carRentals':
        columnMapping = createCarRentalsMapping(sourceHeaders, destHeaders);
        break;
      case 'illinois':
        columnMapping = createIllinoisMapping(sourceHeaders, destHeaders);
        break;
      case 'wholeUS':
        columnMapping = createWholeUSMapping(sourceHeaders, destHeaders);
        break;
      case 'oneM':
        columnMapping = createOneMMapping(sourceHeaders, destHeaders);
        break;
      case 'restaurantsClean':
        columnMapping = createRestaurantsCleanMapping(sourceHeaders, destHeaders);
        break;
      case 'restaurantDups':
        columnMapping = createRestaurantDupsMapping(sourceHeaders, destHeaders);
        break;
      case 'newPrioRest':
        columnMapping = createNewPrioRestMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet1New':
        columnMapping = createSheet1NewMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet2New':
        columnMapping = createSheet2NewMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet1Second':
        columnMapping = createSheet2ThirdMapping(sourceHeaders, destHeaders);
        break;
      case 'newTargets':
        columnMapping = createNewTargetsMapping(sourceHeaders, destHeaders);
        break;
      default:
        throw new Error('Unknown source type: ' + selectedSource.type);
    }

    console.log('Column mapping created');

    // Process and transform the data
    const processedData = processData(sourceData, columnMapping, sourceHeaders, destHeaders);

    console.log('Data processed. Rows to transfer:', processedData.length - 1);

    // Find the next empty row for appending (skip header row)
    const lastRow = destSheet.getLastRow();
    const startRow = lastRow > 1 ? lastRow + 1 : 2;

    console.log('Last row in destination:', lastRow);
    console.log('Starting to append from row:', startRow);

    // Write processed data to destination sheet (APPEND, don't overwrite)
    if (processedData.length > 1) {
      console.log('Appending new data to destination...');
      const outputRange = destSheet.getRange(startRow, 1, processedData.length - 1, processedData[0].length);
      outputRange.setValues(processedData.slice(1));
    }

    console.log(`Successfully appended ${processedData.length - 1} rows of data`);

    return `Successfully appended ${processedData.length - 1} rows from ${selectedSource.sheetName} to ${destSheetName} (starting from row ${startRow})`;

  } catch (error) {
    console.error('Error in transferAndCleanData:', error);
    throw error;
  }
}

// MAPPING FOR SHEET1
function createSheet1Mapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Sheet1 Format - Source headers (lower):', sourceHeadersLower);
  console.log('Sheet1 Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for SHEET1 format
  const sheet1Mappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'siccode': 'sic codes',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(sheet1Mappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Sheet1 Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR RESTAURANT
function createRestaurantMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Restaurant Format - Source headers (lower):', sourceHeadersLower);
  console.log('Restaurant Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for RESTAURANT format
  const restaurantMappings = {
    'fullname': 'fullname',
    'firstname': 'fullname',
    'lastname': 'fullname',
    'jobtitle': 'job title',
    'company': 'company',
    'website': 'website',
    'personallinkedin': 'linkedin url',
    'companylinkedin': 'company linkedin url',
    'companyphonenumber': 'company phone',
    'email': 'email',
    'address': 'company address',
    'street': 'company street',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company postal code',
    'country': 'company country',
    'annualrevenue': 'annual revenue',
    'industry': 'industry',
    'siccode': 'sic codes',
    'employeesize': '# employees'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(restaurantMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Restaurant Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR SHEET3
function createSheet3Mapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Sheet3 Format - Source headers (lower):', sourceHeadersLower);
  console.log('Sheet3 Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for SHEET3 format
  const sheet3Mappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'companyphonenumber': 'company phone 1',
    'email': ['primary email', 'email 1'], // Try Primary Email first, then Email 1
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'siccode': 'sic codes',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(sheet3Mappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      let sourceIndex = -1;

      // Handle multiple possible source columns (for email)
      if (Array.isArray(sourceHeader)) {
        for (const header of sourceHeader) {
          sourceIndex = sourceHeadersLower.indexOf(header.toLowerCase());
          if (sourceIndex !== -1) break;
        }
      } else if (sourceHeader) {
        sourceIndex = sourceHeadersLower.indexOf(sourceHeader.toLowerCase());
      }

      console.log(`Sheet3 Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR USA
function createUSAMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('USA Format - Source headers (lower):', sourceHeadersLower);
  console.log('USA Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for USA format
  const usaMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(usaMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`USA Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR CANADA
function createCanadaMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('CANADA Format - Source headers (lower):', sourceHeadersLower);
  console.log('CANADA Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for CANADA format
  const canadaMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(canadaMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`CANADA Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR OUTSIDE US/CAN
function createOutsideUSCanMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Outside US/Can Format - Source headers (lower):', sourceHeadersLower);
  console.log('Outside US/Can Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for OUTSIDE US/CAN format
  const outsideUSCanMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(outsideUSCanMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Outside US/Can Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR CAR RENTALS
function createCarRentalsMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Car Rentals Format - Source headers (lower):', sourceHeadersLower);
  console.log('Car Rentals Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for CAR RENTALS format
  const carRentalsMappings = {
    'fullname': 'fullname',
    'firstname': 'fullname',
    'lastname': 'fullname',
    'jobtitle': 'job title',
    'company': 'company',
    'website': 'website',
    'personallinkedin': 'linkedin url',
    'companylinkedin': 'company linkedin url',
    'companyphonenumber': 'company phone',
    'email': 'email',
    'address': 'company address',
    'street': 'company street',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company postal code',
    'country': 'company country',
    'annualrevenue': 'annual revenue',
    'industry': 'industry',
    'siccode': 'sic codes',
    'employeesize': '# employees'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(carRentalsMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Car Rentals Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR ILLINOIS
function createIllinoisMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Illinois Format - Source headers (lower):', sourceHeadersLower);
  console.log('Illinois Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for ILLINOIS format based on provided headers
  const illinoisMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(illinoisMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Illinois Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR WHOLE US
function createWholeUSMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Whole US Format - Source headers (lower):', sourceHeadersLower);
  console.log('Whole US Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for WHOLE US format based on provided headers
  const wholeUSMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(wholeUSMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Whole US Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR 1M
function createOneMMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('1m Format - Source headers (lower):', sourceHeadersLower);
  console.log('1m Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for 1M format based on provided headers
  const oneMMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(oneMMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`1m Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR RESTAURANTS CLEAN
function createRestaurantsCleanMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Restaurants Clean Format - Source headers (lower):', sourceHeadersLower);
  console.log('Restaurants Clean Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for RESTAURANTS CLEAN format based on provided headers
  const restaurantsCleanMappings = {
    'fullname': 'fullname',
    'firstname': 'fullname',
    'lastname': 'fullname',
    'jobtitle': 'job title',
    'company': 'company',
    'website': 'website',
    'personallinkedin': 'linkedin url',
    'companylinkedin': 'company linkedin url',
    'companyphonenumber': 'company phone',
    'email': 'email',
    'address': 'company address',
    'street': 'company street',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company postal code',
    'country': 'company country',
    'annualrevenue': 'annual revenue',
    'industry': 'industry',
    'siccode': 'sic codes',
    'employeesize': '# employees'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(restaurantsCleanMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Restaurants Clean Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR RESTAURANT DUPS
function createRestaurantDupsMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Restaurant Dups Format - Source headers (lower):', sourceHeadersLower);
  console.log('Restaurant Dups Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for RESTAURANT DUPS format based on provided headers
  const restaurantDupsMappings = {
    'fullname': 'fullname',
    'firstname': 'fullname',
    'lastname': 'fullname',
    'jobtitle': 'job title',
    'company': 'company',
    'website': 'website',
    'personallinkedin': 'linkedin url',
    'companylinkedin': 'company linkedin url',
    'companyphonenumber': 'company phone',
    'email': 'email',
    'address': 'company address',
    'street': 'company street',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company postal code',
    'country': 'company country',
    'annualrevenue': 'annual revenue',
    'industry': 'industry',
    'siccode': 'sic codes',
    'employeesize': '# employees'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(restaurantDupsMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Restaurant Dups Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR NEW PRIO REST
function createNewPrioRestMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('New Prio Rest Format - Source headers (lower):', sourceHeadersLower);
  console.log('New Prio Rest Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for NEW PRIO REST format based on provided headers
  const newPrioRestMappings = {
    'fullname': 'fullname',
    'firstname': 'fullname',
    'lastname': 'fullname',
    'jobtitle': 'job title',
    'company': 'company',
    'website': 'website',
    'personallinkedin': 'linkedin url',
    'companylinkedin': 'company linkedin url',
    'companyphonenumber': 'company phone',
    'email': 'email',
    'address': 'company address',
    'street': 'company street',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company postal code',
    'country': 'company country',
    'annualrevenue': 'annual revenue',
    'industry': 'industry',
    'siccode': 'sic codes',
    'employeesize': '# employees'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(newPrioRestMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`New Prio Rest Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR NEW SHEET1
function createSheet1NewMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('New Sheet1 Format - Source headers (lower):', sourceHeadersLower);
  console.log('New Sheet1 Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for NEW SHEET1 format based on provided headers
  const sheet1NewMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(sheet1NewMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`New Sheet1 Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR SHEET2
function createSheet2NewMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Sheet2 Format - Source headers (lower):', sourceHeadersLower);
  console.log('Sheet2 Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for SHEET2 format based on provided headers
  const sheet2NewMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'altphonenumber': 'contact phone 1',
    'companyphonenumber': 'company phone 1',
    'email': 'email 1',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(sheet2NewMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Sheet2 Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR SHEET2 (THIRD SPREADSHEET)
function createSheet2ThirdMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('Sheet2 Third Format - Source headers (lower):', sourceHeadersLower);
  console.log('Sheet2 Third Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for SHEET2 THIRD format based on provided headers
  const sheet2ThirdMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'companyphonenumber': 'company phone 1',
    'email': 'primary email',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'siccode': 'sic codes',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(sheet2ThirdMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`Sheet2 Third Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// MAPPING FOR NEW TARGETS
function createNewTargetsMapping(sourceHeaders, destHeaders) {
  const mapping = {};

  const sourceHeadersLower = sourceHeaders.map(h => h.toString().toLowerCase().trim());
  const destHeadersLower = destHeaders.map(h => h.toString().toLowerCase().trim());

  console.log('NEW TARGETS Format - Source headers (lower):', sourceHeadersLower);
  console.log('NEW TARGETS Format - Dest headers (lower):', destHeadersLower);

  // Exact mappings for NEW TARGETS format based on provided headers
  const newTargetsMappings = {
    'fullname': 'contact full name',
    'firstname': 'contact full name',
    'lastname': 'contact full name',
    'jobtitle': 'title',
    'company': 'company name - cleaned',
    'website': 'website',
    'personallinkedin': 'contact li profile url',
    'companylinkedin': 'company li profile url',
    'companyphonenumber': 'company phone 1',
    'email': 'primary email',
    'address': 'company location',
    'street': 'company street 1',
    'city': 'company city',
    'state': 'company state',
    'postalcode': 'company post code',
    'country': 'company country',
    'annualrevenue': 'company annual revenue',
    'industry': 'company industry',
    'siccode': 'sic codes',
    'employeesize': 'company staff count'
  };

  // Create the mapping
  for (const [destHeader, sourceHeader] of Object.entries(newTargetsMappings)) {
    const destIndex = destHeadersLower.indexOf(destHeader);

    if (destIndex !== -1) {
      const sourceIndex = sourceHeader ? sourceHeadersLower.indexOf(sourceHeader.toLowerCase()) : -1;

      console.log(`NEW TARGETS Mapping ${destHeader} to ${sourceHeader}: destIndex=${destIndex}, sourceIndex=${sourceIndex}`);

      if (sourceIndex !== -1) {
        mapping[destIndex] = {
          sourceIndex: sourceIndex,
          transform: getTransformationFunction(destHeader),
          sourceColumn: sourceHeader
        };
      } else {
        mapping[destIndex] = {
          sourceIndex: -1,
          transform: () => '',
          sourceColumn: null
        };
      }
    }
  }

  // Handle unmapped columns (leave blank)
  destHeadersLower.forEach((header, index) => {
    if (!mapping[index]) {
      mapping[index] = {
        sourceIndex: -1,
        transform: () => '',
        sourceColumn: null
      };
    }
  });

  return mapping;
}

// SPECIFIC TRANSFER FUNCTIONS FOR EACH SHEET
function transferFromSheet1() {
  const sourceSpreadsheetId = '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA';
  const sourceSheetName = 'Sheet1';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'sheet1');
}

function transferFromRestaurant() {
  const sourceSpreadsheetId = '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA';
  const sourceSheetName = 'Restaurant';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'restaurant');
}

function transferFromSheet3() {
  const sourceSpreadsheetId = '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA';
  const sourceSheetName = 'Sheet3';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'sheet3');
}

function transferFromUSA() {
  const sourceSpreadsheetId = '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc';
  const sourceSheetName = 'USA';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'usa');
}

function transferFromCanada() {
  const sourceSpreadsheetId = '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc';
  const sourceSheetName = 'CANADA';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'canada');
}

function transferFromOutsideUSCan() {
  const sourceSpreadsheetId = '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc';
  const sourceSheetName = 'Outside US/Can';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'outsideUSCan');
}

function transferFromCarRentals() {
  const sourceSpreadsheetId = '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc';
  const sourceSheetName = 'Car rentals';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'carRentals');
}

function transferFromIllinois() {
  const sourceSpreadsheetId = '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg';
  const sourceSheetName = 'Illinois';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'illinois');
}

function transferFromWholeUS() {
  const sourceSpreadsheetId = '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg';
  const sourceSheetName = 'Whole US';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'wholeUS');
}

function transferFrom1m() {
  const sourceSpreadsheetId = '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg';
  const sourceSheetName = '1m';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'oneM');
}

function transferFromRestaurantsClean() {
  const sourceSpreadsheetId = '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg';
  const sourceSheetName = 'Restaurants Clean';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'restaurantsClean');
}

function transferFromRestaurantDups() {
  const sourceSpreadsheetId = '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg';
  const sourceSheetName = 'Restaurant Dups';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'restaurantDups');
}

function transferFromNewPrioRest() {
  const sourceSpreadsheetId = '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg';
  const sourceSheetName = 'New Prio Rest';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'newPrioRest');
}

function transferFromSheet1New() {
  const sourceSpreadsheetId = '1vgLp6ebl35x36GFbCL6pFePED-InewXqFH0wxYKoyak';
  const sourceSheetName = 'Sheet1';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'sheet1New');
}

function transferFromSheet2New() {
  const sourceSpreadsheetId = '1vgLp6ebl35x36GFbCL6pFePED-InewXqFH0wxYKoyak';
  const sourceSheetName = 'Sheet2';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'sheet2New');
}

function transferFromSheet2Third() {
  const sourceSpreadsheetId = '1bHEZBTIqyp3jg_XIZ0V-YmA0pqErauGuacMJyd4iaQU';
  const sourceSheetName = 'Sheet1';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'sheet1Second');
}

function transferFromNewTargets() {
  const sourceSpreadsheetId = '1bHEZBTIqyp3jg_XIZ0V-YmA0pqErauGuacMJyd4iaQU';
  const sourceSheetName = 'NEW TARGETS';
  return transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, 'newTargets');
}

// UNIVERSAL TRANSFER FUNCTION
function transferFromSpecificSource(sourceSpreadsheetId, sourceSheetName, formatType) {
  try {
    console.log(`Transferring from ${formatType} format - Sheet: ${sourceSheetName}...`);

    const destSpreadsheetId = '18m5GMfnLA4VNtCWkXpSTkXX-dwpwwstYOImaPOQuR4g';
    const destSheetName = 'Paul List';

    // Open spreadsheets
    const sourceSS = SpreadsheetApp.openById(sourceSpreadsheetId);
    const destSS = SpreadsheetApp.openById(destSpreadsheetId);
    const sourceSheet = sourceSS.getSheetByName(sourceSheetName);
    const destSheet = destSS.getSheetByName(destSheetName);

    if (!sourceSheet) {
      throw new Error('Source sheet not found: ' + sourceSheetName);
    }
    if (!destSheet) {
      throw new Error('Destination sheet not found: ' + destSheetName);
    }

    // Get data
    const sourceData = sourceSheet.getDataRange().getValues();
    const sourceHeaders = sourceData[0];
    const destHeaders = destSheet.getRange(1, 1, 1, destSheet.getLastColumn()).getValues()[0];

    console.log(`Source sheet has ${sourceData.length} total rows (including header)`);
    console.log(`Source data rows to process: ${sourceData.length - 1}`);

    // Choose mapping based on format type
    let columnMapping;
    switch (formatType) {
      case 'sheet1':
        columnMapping = createSheet1Mapping(sourceHeaders, destHeaders);
        break;
      case 'restaurant':
        columnMapping = createRestaurantMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet3':
        columnMapping = createSheet3Mapping(sourceHeaders, destHeaders);
        break;
      case 'usa':
        columnMapping = createUSAMapping(sourceHeaders, destHeaders);
        break;
      case 'canada':
        columnMapping = createCanadaMapping(sourceHeaders, destHeaders);
        break;
      case 'outsideUSCan':
        columnMapping = createOutsideUSCanMapping(sourceHeaders, destHeaders);
        break;
      case 'carRentals':
        columnMapping = createCarRentalsMapping(sourceHeaders, destHeaders);
        break;
      case 'illinois':
        columnMapping = createIllinoisMapping(sourceHeaders, destHeaders);
        break;
      case 'wholeUS':
        columnMapping = createWholeUSMapping(sourceHeaders, destHeaders);
        break;
      case 'oneM':
        columnMapping = createOneMMapping(sourceHeaders, destHeaders);
        break;
      case 'restaurantsClean':
        columnMapping = createRestaurantsCleanMapping(sourceHeaders, destHeaders);
        break;
      case 'restaurantDups':
        columnMapping = createRestaurantDupsMapping(sourceHeaders, destHeaders);
        break;
      case 'newPrioRest':
        columnMapping = createNewPrioRestMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet1New':
        columnMapping = createSheet1NewMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet2New':
        columnMapping = createSheet2NewMapping(sourceHeaders, destHeaders);
        break;
      case 'sheet1Second':
        columnMapping = createSheet2ThirdMapping(sourceHeaders, destHeaders);
        break;
      case 'newTargets':
        columnMapping = createNewTargetsMapping(sourceHeaders, destHeaders);
        break;
      default:
        throw new Error('Unknown format type: ' + formatType);
    }

    // Process data
    const processedData = processData(sourceData, columnMapping, sourceHeaders, destHeaders);

    // Find the next empty row for appending
    const lastRow = destSheet.getLastRow();
    const startRow = lastRow > 1 ? lastRow + 1 : 2;

    console.log(`Last row in destination: ${lastRow}, starting from row: ${startRow}`);
    console.log(`Valid processed rows to append: ${processedData.length - 1}`);

    // Append data (don't clear existing data)
    if (processedData.length > 1) {
      // Double-check for empty rows before appending
      const dataToAppend = processedData.slice(1).filter(row => !isRowEmpty(row));

      console.log(`Final filtered rows to append: ${dataToAppend.length}`);

      if (dataToAppend.length > 0) {
        // Log first few rows for verification
        console.log('Sample of first 3 rows to append:');
        for (let i = 0; i < Math.min(3, dataToAppend.length); i++) {
          console.log(`Row ${i + 1}:`, dataToAppend[i].slice(0, 5)); // First 5 columns
        }

        destSheet.getRange(startRow, 1, dataToAppend.length, dataToAppend[0].length)
          .setValues(dataToAppend);

        console.log(`Successfully appended ${dataToAppend.length} rows from ${sourceSheetName}`);
        return `Appended ${dataToAppend.length} rows from ${sourceSheetName} (starting from row ${startRow})`;
      } else {
        return `No valid data found to transfer from ${sourceSheetName}. All rows were empty or contained only invalid data.`;
      }
    } else {
      return `No valid data found to transfer from ${sourceSheetName}.`;
    }

  } catch (error) {
    console.error(`Error in transferFromSpecificSource (${sourceSheetName}):`, error);
    throw error;
  }
}

// TRANSFER FROM ALL SHEETS
function transferFromAllSheets() {
  try {
    const sheetsToTransfer = [
      { name: 'Sheet1', type: 'sheet1', id: '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA' },
      { name: 'Restaurant', type: 'restaurant', id: '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA' },
      { name: 'Sheet3', type: 'sheet3', id: '1daK1DsThWH_wW8FyX-Oeu399RlVcpQCve6dybSecfNA' },
      { name: 'USA', type: 'usa', id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc' },
      { name: 'CANADA', type: 'canada', id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc' },
      { name: 'Outside US/Can', type: 'outsideUSCan', id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc' },
      { name: 'Car rentals', type: 'carRentals', id: '17ofQ1xJX1Ue8WWCAFIO_OloVRezFsSijGymuEu6aUoc' },
      { name: 'Illinois', type: 'illinois', id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg' },
      { name: 'Whole US', type: 'wholeUS', id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg' },
      { name: '1m', type: 'oneM', id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg' },
      { name: 'Restaurants Clean', type: 'restaurantsClean', id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg' },
      { name: 'Restaurant Dups', type: 'restaurantDups', id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg' },
      { name: 'New Prio Rest', type: 'newPrioRest', id: '1gTJvxLMr2O4LAtP67slIXAZVXJ-yCWYS_Ggb0Z91Ypg' },
      { name: 'Sheet1', type: 'sheet1New', id: '1vgLp6ebl35x36GFbCL6pFePED-InewXqFH0wxYKoyak' },
      { name: 'Sheet2', type: 'sheet2New', id: '1vgLp6ebl35x36GFbCL6pFePED-InewXqFH0wxYKoyak' },
      { name: 'Sheet2', type: 'sheet2Third', id: '1bHEZBTIqyp3jg_XIZ0V-YmA0pqErauGuacMJyd4iaQU' },
      { name: 'NEW TARGETS', type: 'newTargets', id: '1bHEZBTIqyp3jg_XIZ0V-YmA0pqErauGuacMJyd4iaQU' }
    ];
    let totalTransferred = 0;
    let results = [];

    for (const sheet of sheetsToTransfer) {
      try {
        console.log(`=== Transferring from ${sheet.name} ===`);
        const result = transferFromSpecificSource(sheet.id, sheet.name, sheet.type);
        results.push(result);

        // Extract number of rows transferred from result message
        const match = result.match(/Appended (\d+) rows/);
        if (match) {
          totalTransferred += parseInt(match[1]);
        }

        console.log(`=== Completed ${sheet.name} ===`);

      } catch (error) {
        console.error(`Error transferring from ${sheet.name}:`, error);
        results.push(`Error transferring from ${sheet.name}: ${error.message}`);
      }
    }

    return `All sheets transfer completed! Total rows appended: ${totalTransferred}\n\nDetails:\n- ${results.join('\n- ')}`;

  } catch (error) {
    console.error('Error in transferFromAllSheets:', error);
    throw error;
  }
}

// DATA PROCESSING FUNCTIONS
function processData(sourceData, columnMapping, sourceHeaders, destHeaders) {
  const processedData = [destHeaders];

  for (let i = 1; i < sourceData.length; i++) {
    const sourceRow = sourceData[i];

    // Skip empty rows - enhanced check
    if (isRowEmpty(sourceRow)) {
      console.log(`Skipping empty row ${i + 1}`);
      continue;
    }

    let processedRow = new Array(destHeaders.length).fill('');

    // Apply strict mappings only
    for (const [destIndex, mapping] of Object.entries(columnMapping)) {
      const destIdx = parseInt(destIndex);

      if (mapping.sourceIndex !== -1 && mapping.sourceIndex < sourceRow.length) {
        const sourceValue = sourceRow[mapping.sourceIndex];
        processedRow[destIdx] = mapping.transform(sourceValue);
      } else {
        processedRow[destIdx] = mapping.transform();
      }
    }

    // Clean up data
    processedRow = cleanRowData(processedRow);

    // Check if the processed row is still empty after transformations
    if (isRowEmpty(processedRow)) {
      console.log(`Skipping row ${i + 1} - became empty after processing`);
      continue;
    }

    processedData.push(processedRow);
  }

  console.log(`Processed ${processedData.length - 1} valid rows from ${sourceData.length - 1} source rows`);
  return processedData;
}

function isRowEmpty(row) {
  if (!row || row.length === 0) return true;

  let hasValidData = false;

  for (let i = 0; i < row.length; i++) {
    const value = row[i];

    // Check if value exists and is not just whitespace
    if (value !== null && value !== undefined && value !== '') {
      const stringValue = String(value).trim();

      // Skip common empty patterns and unwanted strings
      if (stringValue !== '' &&
        !stringValue.match(/^[\s\-\.]*$/) && // Not just spaces, dashes, or dots
        !stringValue.match(/^n\/a$/i) && // Not "N/A"
        !stringValue.match(/^null$/i) && // Not "null"
        !stringValue.match(/^undefined$/i) && // Not "undefined"
        !stringValue.match(/^#n\/a$/i) && // Not "#N/A"
        !stringValue.match(/^#value!$/i)) { // Not "#VALUE!"
        hasValidData = true;
        break;
      }
    }
  }

  return !hasValidData;
}

function cleanRowData(row) {
  const cleanedRow = [...row];

  for (let i = 0; i < cleanedRow.length; i++) {
    const value = cleanedRow[i];

    if (value === null || value === undefined || value === '') {
      cleanedRow[i] = '';
      continue;
    }

    // Handle Date objects
    if (value instanceof Date) {
      cleanedRow[i] = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    else if (typeof value === 'object') {
      cleanedRow[i] = String(value).trim();
    }
    else {
      cleanedRow[i] = String(value).trim();
    }

    // Clean date strings and unwanted patterns
    cleanedRow[i] = cleanValueString(cleanedRow[i]);
  }

  return cleanedRow;
}

function cleanValueString(value) {
  if (!value || typeof value !== 'string') return value;

  let cleaned = value.trim();

  // Remove unwanted date strings
  const unwantedPatterns = [
    /Wed Oct 26 2022 00:00:00 GMT\+0800 \(China Standard Time\)/,
    /[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT\+\d{4} \([A-Za-z\s]+\)/,
    /^[\s\-\.]*$/, // Only spaces, dashes, or dots
    /^n\/a$/i, // "N/A"
    /^null$/i, // "null"
    /^undefined$/i, // "undefined"
    /^#n\/a$/i, // "#N/A"
    /^#value!$/i // "#VALUE!"
  ];

  for (const pattern of unwantedPatterns) {
    if (pattern.test(cleaned)) {
      return '';
    }
  }

  return cleaned;
}

function cleanDateString(value) {
  if (!value || typeof value !== 'string') return value;

  const datePatterns = [
    /Wed Oct 26 2022 00:00:00 GMT\+0800 \(China Standard Time\)/,
    /[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT\+\d{4} \([A-Za-z\s]+\)/
  ];

  for (const pattern of datePatterns) {
    if (pattern.test(value)) {
      return '';
    }
  }

  return value;
}

// TRANSFORMATION FUNCTIONS
function getTransformationFunction(columnName) {
  const transformations = {
    'firstname': (value) => extractFirstName(value),
    'lastname': (value) => extractLastName(value),
    'jobtitle': (value) => cleanJobTitle(value),
    'company': (value) => cleanCompanyName(value),
    'email': (value) => cleanEmail(value),
    'website': (value) => cleanWebsite(value),
    'annualrevenue': (value) => cleanRevenue(value),
    'employeesize': (value) => cleanEmployeeSize(value)
  };

  return transformations[columnName] || ((value) => {
    if (value === null || value === undefined) return '';

    // Handle Date objects
    if (value instanceof Date) {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }

    const stringValue = String(value).trim();

    // Clean unwanted date strings
    if (stringValue.match(/[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT\+\d{4} \([A-Za-z\s]+\)/)) {
      return '';
    }

    return stringValue;
  });
}

function extractFirstName(fullName) {
  if (!fullName) return '';
  const name = String(fullName).trim();
  const names = name.split(/\s+/);
  return names[0] || '';
}

function extractLastName(fullName) {
  if (!fullName) return '';
  const name = String(fullName).trim();
  const names = name.split(/\s+/);
  return names.length > 1 ? names.slice(1).join(' ') : '';
}

function cleanJobTitle(title) {
  if (!title) return '';
  let cleaned = String(title).trim();
  if (cleaned === '') return '';

  const companyIndicators = ['inc', 'llc', 'corp', 'corporation', 'company', 'co', 'ltd', 'limited', 'group', 'holdings'];
  const titleWords = cleaned.toLowerCase().split(/\s+/);

  if (companyIndicators.some(indicator => titleWords.includes(indicator)) ||
    cleaned.match(/\b(inc|llc|corp|ltd|co)\b/i)) {
    return '';
  }

  return cleaned;
}

function cleanCompanyName(company) {
  if (!company) return '';
  let cleaned = String(company).trim();
  if (cleaned === '') return '';

  const titleIndicators = ['manager', 'director', 'president', 'ceo', 'cfo', 'cto', 'vp', 'vice president', 'assistant', 'executive', 'head of'];
  const companyWords = cleaned.toLowerCase().split(/\s+/);

  if (titleIndicators.some(indicator =>
    companyWords.includes(indicator) ||
    cleaned.toLowerCase().includes(indicator))) {
    return '';
  }

  return cleaned;
}

function cleanEmail(email) {
  if (!email) return '';
  if (email instanceof Date) return '';

  const cleaned = String(email).trim().toLowerCase();

  if (cleaned.match(/[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT\+\d{4} \([A-Za-z\s]+\)/)) {
    return '';
  }

  if (cleaned.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return cleaned;
  }

  return '';
}

function cleanWebsite(website) {
  if (!website) return '';
  if (website instanceof Date) return '';

  let cleaned = String(website).trim().toLowerCase();
  if (cleaned === '') return '';

  if (cleaned.match(/[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT\+\d{4} \([A-Za-z\s]+\)/)) {
    return '';
  }

  if (cleaned && !cleaned.startsWith('http')) {
    cleaned = 'https://' + cleaned;
  }

  return cleaned;
}

function cleanRevenue(revenue) {
  if (!revenue) return '';
  return String(revenue).trim();
}

function cleanEmployeeSize(size) {
  if (!size) return '';
  return String(size).trim();
}

// PAUL LIST TO ALL LIST TRANSFER FUNCTIONS
function transferPaulListToAllList() {
  try {
    console.log('Starting transfer from Paul List to ALL List...');

    const spreadsheetId = '18m5GMfnLA4VNtCWkXpSTkXX-dwpwwstYOImaPOQuR4g';
    const sourceSheetName = 'Paul List';
    const destSheetName = 'ALL List';

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sourceSheet = ss.getSheetByName(sourceSheetName);
    const destSheet = ss.getSheetByName(destSheetName);

    if (!sourceSheet) throw new Error('Source sheet not found: ' + sourceSheetName);
    if (!destSheet) throw new Error('Destination sheet not found: ' + destSheetName);

    const sourceData = sourceSheet.getDataRange().getValues();
    const sourceHeaders = sourceData[0];
    const destData = destSheet.getDataRange().getValues();
    const destHeaders = destData[0];

    console.log(`Source (Paul List) has ${sourceData.length - 1} rows`);
    console.log(`Destination (ALL List) has ${destData.length - 1} rows`);

    const existingEmails = new Set();
    const emailIndexDest = destHeaders.indexOf('Email');

    for (let i = 1; i < destData.length; i++) {
      if (emailIndexDest !== -1 && destData[i][emailIndexDest]) {
        const email = destData[i][emailIndexDest].toString().toLowerCase().trim();
        if (email) existingEmails.add(email);
      }
    }

    console.log(`Found ${existingEmails.size} existing emails for duplicate checking`);

    const newRows = [];
    const duplicateRows = [];
    const emailIndexSource = sourceHeaders.indexOf('Email');

    for (let i = 1; i < sourceData.length; i++) {
      const row = sourceData[i];
      const email = emailIndexSource !== -1 && row[emailIndexSource]
        ? row[emailIndexSource].toString().toLowerCase().trim()
        : '';

      if (email && existingEmails.has(email)) {
        duplicateRows.push({ row: i + 1, email: email });
      } else {
        newRows.push(row);
        if (email) existingEmails.add(email);
      }
    }

    console.log(`New rows to transfer: ${newRows.length}, Duplicate rows skipped: ${duplicateRows.length}`);

    if (newRows.length > 0) {
      const lastRow = destSheet.getLastRow();
      const startRow = lastRow > 1 ? lastRow + 1 : 2;

      destSheet.getRange(startRow, 1, newRows.length, newRows[0].length).setValues(newRows);

      console.log(`Successfully appended ${newRows.length} new rows to ALL List`);

      let resultMessage = `Successfully transferred ${newRows.length} new rows from Paul List to ALL List`;

      if (duplicateRows.length > 0) {
        resultMessage += `\n\nSkipped ${duplicateRows.length} duplicate rows (already exist in ALL List)`;
        if (duplicateRows.length <= 10) {
          resultMessage += `\nDuplicate emails: ${duplicateRows.map(d => d.email).join(', ')}`;
        } else {
          resultMessage += `\nFirst 10 duplicate emails: ${duplicateRows.slice(0, 10).map(d => d.email).join(', ')}`;
        }
      }

      return resultMessage;
    } else {
      return `No new rows to transfer. All ${duplicateRows.length} rows in Paul List already exist in ALL List.`;
    }

  } catch (error) {
    console.error('Error in transferPaulListToAllList:', error);
    throw error;
  }
}

function transferNewRowsToAllList() {
  try {
    console.log('Starting smart transfer of new rows to ALL List...');

    const spreadsheetId = '18m5GMfnLA4VNtCWkXpSTkXX-dwpwwstYOImaPOQuR4g';
    const sourceSheetName = 'Paul List';
    const destSheetName = 'ALL List';

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sourceSheet = ss.getSheetByName(sourceSheetName);
    const destSheet = ss.getSheetByName(destSheetName);

    if (!sourceSheet || !destSheet) throw new Error('Source or destination sheet not found');

    const sourceData = sourceSheet.getDataRange().getValues();
    const sourceHeaders = sourceData[0];
    const destData = destSheet.getDataRange().getValues();
    const destHeaders = destData[0];

    const scriptProperties = PropertiesService.getScriptProperties();
    const lastTransferredRow = parseInt(scriptProperties.getProperty('lastTransferredRow')) || 1;

    console.log(`Last transferred row: ${lastTransferredRow}, Current Paul List rows: ${sourceData.length}`);

    const newRows = [];
    const startRow = Math.max(lastTransferredRow + 1, 2);

    if (startRow <= sourceData.length) {
      for (let i = startRow - 1; i < sourceData.length; i++) {
        newRows.push(sourceData[i]);
      }
    }

    console.log(`New rows found since last transfer: ${newRows.length}`);

    if (newRows.length === 0) return 'No new rows found in Paul List since last transfer.';

    const existingEmails = new Set();
    const emailIndexDest = destHeaders.indexOf('Email');

    for (let i = 1; i < destData.length; i++) {
      if (emailIndexDest !== -1 && destData[i][emailIndexDest]) {
        const email = destData[i][emailIndexDest].toString().toLowerCase().trim();
        if (email) existingEmails.add(email);
      }
    }

    const uniqueNewRows = [];
    const emailIndexSource = sourceHeaders.indexOf('Email');
    const duplicateEmails = [];

    for (const row of newRows) {
      const email = emailIndexSource !== -1 && row[emailIndexSource]
        ? row[emailIndexSource].toString().toLowerCase().trim()
        : '';

      if (!email || !existingEmails.has(email)) {
        uniqueNewRows.push(row);
        if (email) existingEmails.add(email);
      } else if (email) duplicateEmails.push(email);
    }

    console.log(`Unique new rows after duplicate check: ${uniqueNewRows.length}`);

    if (uniqueNewRows.length > 0) {
      const lastRow = destSheet.getLastRow();
      const startAppendRow = lastRow > 1 ? lastRow + 1 : 2;

      destSheet.getRange(startAppendRow, 1, uniqueNewRows.length, uniqueNewRows[0].length).setValues(uniqueNewRows);

      scriptProperties.setProperty('lastTransferredRow', sourceData.length.toString());

      let resultMessage = `Successfully transferred ${uniqueNewRows.length} new rows to ALL List`;
      if (duplicateEmails.length > 0) resultMessage += `\nSkipped ${duplicateEmails.length} duplicate rows`;
      resultMessage += `\nLast transferred row updated to: ${sourceData.length}`;

      return resultMessage;
    } else {
      return `No unique new rows to transfer. All ${newRows.length} new rows were duplicates.`;
    }

  } catch (error) {
    console.error('Error in transferNewRowsToAllList:', error);
    throw error;
  }
}

function transferAllPaulListToAllList() {
  try {
    console.log('Starting complete transfer from Paul List to ALL List...');

    const spreadsheetId = '18m5GMfnLA4VNtCWkXpSTkXX-dwpwwstYOImaPOQuR4g';
    const sourceSheetName = 'Paul List';
    const destSheetName = 'ALL List';

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sourceSheet = ss.getSheetByName(sourceSheetName);
    const destSheet = ss.getSheetByName(destSheetName);

    if (!sourceSheet) throw new Error('Source sheet not found: ' + sourceSheetName);
    if (!destSheet) throw new Error('Destination sheet not found: ' + destSheetName);

    const sourceData = sourceSheet.getDataRange().getValues();

    console.log(`Source (Paul List) has ${sourceData.length - 1} rows`);

    const lastRow = destSheet.getLastRow();
    const startRow = lastRow > 1 ? lastRow + 1 : 2;

    console.log(`Last row in ALL List: ${lastRow}, starting from row: ${startRow}`);

    if (sourceData.length > 1) {
      destSheet.getRange(startRow, 1, sourceData.length - 1, sourceData[0].length).setValues(sourceData.slice(1));

      console.log(`Successfully appended ${sourceData.length - 1} rows from Paul List to ALL List`);
      return `Successfully transferred ALL ${sourceData.length - 1} rows from Paul List to ALL List (starting from row ${startRow})`;
    } else {
      return 'No data found in Paul List to transfer.';
    }

  } catch (error) {
    console.error('Error in transferAllPaulListToAllList:', error);
    throw error;
  }
}

// UTILITY FUNCTIONS
function getDestinationStatus() {
  try {
    const destSpreadsheetId = '18m5GMfnLA4VNtCWkXpSTkXX-dwpwwstYOImaPOQuR4g';
    const destSheetName = 'Paul List';

    const destSS = SpreadsheetApp.openById(destSpreadsheetId);
    const destSheet = destSS.getSheetByName(destSheetName);

    const lastRow = destSheet.getLastRow();
    const totalRows = lastRow > 1 ? lastRow - 1 : 0;

    return `Destination sheet "${destSheetName}" has ${totalRows} rows of data (last row: ${lastRow})`;

  } catch (error) {
    console.error('Error in getDestinationStatus:', error);
    return 'Error getting destination status: ' + error.message;
  }
}

function getTransferStatus() {
  try {
    const spreadsheetId = '18m5GMfnLA4VNtCWkXpSTkXX-dwpwwstYOImaPOQuR4g';
    const ss = SpreadsheetApp.openById(spreadsheetId);
    const paulListSheet = ss.getSheetByName('Paul List');
    const allListSheet = ss.getSheetByName('ALL List');

    if (!paulListSheet || !allListSheet) throw new Error('Paul List or ALL List sheet not found');

    const paulListData = paulListSheet.getDataRange().getValues();
    const allListData = allListSheet.getDataRange().getValues();

    const scriptProperties = PropertiesService.getScriptProperties();
    const lastTransferredRow = parseInt(scriptProperties.getProperty('lastTransferredRow')) || 1;

    const newRowsCount = Math.max(0, paulListData.length - lastTransferredRow);

    return `Transfer Status:
Paul List Rows: ${paulListData.length - 1}
ALL List Rows: ${allListData.length - 1}
Last Transferred Row: ${lastTransferredRow}
New Rows Pending Transfer: ${newRowsCount}`;

  } catch (error) {
    console.error('Error in getTransferStatus:', error);
    return 'Error getting transfer status: ' + error.message;
  }
}

function resetTransferTracking() {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.deleteProperty('lastTransferredRow');
    return 'Transfer tracking has been reset. Next transfer will process all rows from Paul List.';
  } catch (error) {
    console.error('Error in resetTransferTracking:', error);
    throw error;
  }
}

// MENU FUNCTION
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu('Data Transfer');

    // Transfer from uncleaned sources to Paul List
    menu.addItem('Transfer from Sheet1', 'transferFromSheet1');
    menu.addItem('Transfer from Restaurant', 'transferFromRestaurant');
    menu.addItem('Transfer from Sheet3', 'transferFromSheet3');
    menu.addItem('Transfer from USA', 'transferFromUSA');
    menu.addItem('Transfer from CANADA', 'transferFromCanada');
    menu.addItem('Transfer from Outside US/Can', 'transferFromOutsideUSCan');
    menu.addItem('Transfer from Car rentals', 'transferFromCarRentals');
    menu.addItem('Transfer from Illinois', 'transferFromIllinois');
    menu.addItem('Transfer from Whole US', 'transferFromWholeUS');
    menu.addItem('Transfer from 1m', 'transferFrom1m');
    menu.addItem('Transfer from Restaurants Clean', 'transferFromRestaurantsClean');
    menu.addItem('Transfer from Restaurant Dups', 'transferFromRestaurantDups');
    menu.addItem('Transfer from New Prio Rest', 'transferFromNewPrioRest');
    menu.addItem('Transfer from Sheet1 (New)', 'transferFromSheet1New');
    menu.addItem('Transfer from Sheet2 (New)', 'transferFromSheet2New');
    menu.addItem('Transfer from Sheet1 (Third)', 'transferFromSheet2Third');
    menu.addItem('Transfer from NEW TARGETS', 'transferFromNewTargets');
    menu.addSeparator();
    menu.addItem('Transfer from ALL Sheets', 'transferFromAllSheets');
    menu.addItem('Transfer Data (Auto)', 'transferAndCleanData');
    menu.addSeparator();

    // Transfer from Paul List to ALL List
    menu.addItem('▶ Paul List → ALL List (Full)', 'transferPaulListToAllList');
    menu.addItem('▶ Paul List → ALL List (New Rows Only)', 'transferNewRowsToAllList');
    menu.addItem('▶ Paul List → ALL List (ALL DATA)', 'transferAllPaulListToAllList');
    menu.addSeparator();

    // Status and management
    menu.addItem('Check Destination Status', 'getDestinationStatus');
    menu.addItem('Check Transfer Status', 'getTransferStatus');
    menu.addItem('Reset Transfer Tracking', 'resetTransferTracking');

    menu.addToUi();

  } catch (error) {
    console.error('Error creating menu:', error);
  }
}