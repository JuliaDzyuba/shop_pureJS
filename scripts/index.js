'use strict';

import generateHeader from './generateHeader.js';
import generateCatalog from './generateCatalog.js';
import generateFooter from './generateFooter.js';

// import { loadData } from './loadData.js';
import generateGoogsPage from './generateGoogsPage.js';
import generateItemPage from './generateItemPage.js';
import generateCartPage from './generateCartPage.js';


generateHeader();
generateCatalog();
generateFooter();
generateGoogsPage();
generateItemPage();
generateCartPage();
// loadData();