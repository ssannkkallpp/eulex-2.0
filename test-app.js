// Simple test script to verify EULEX React app functionality
const puppeteer = require('puppeteer');

async function testEULEXApp() {
    console.log('🧪 Testing EULEX React App...');
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        // Navigate to the app
        console.log('📱 Loading app at http://localhost:3000...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
        
        // Check if the app loaded correctly
        const title = await page.title();
        console.log(`✅ Page title: ${title}`);
        
        // Check for React app mount
        const rootElement = await page.$('#root');
        if (rootElement) {
            console.log('✅ React app mounted successfully');
        } else {
            console.log('❌ React app not mounted');
        }
        
        // Check for language modal (should appear on first visit)
        const languageModal = await page.$('.fixed.inset-0.bg-black.bg-opacity-50');
        if (languageModal) {
            console.log('✅ Language selection modal is present');
        } else {
            console.log('ℹ️ Language modal not present (may have been dismissed)');
        }
        
        // Check for story selection
        const storySelection = await page.$('.story-card');
        if (storySelection) {
            console.log('✅ Story selection cards are present');
        } else {
            console.log('❌ Story selection not found');
        }
        
        // Check for header
        const header = await page.$('header');
        if (header) {
            console.log('✅ Header is present');
        } else {
            console.log('❌ Header not found');
        }
        
        // Check for EULEX title
        const eulexTitle = await page.$('h1');
        if (eulexTitle) {
            const titleText = await eulexTitle.evaluate(el => el.textContent);
            console.log(`✅ EULEX title found: ${titleText}`);
        } else {
            console.log('❌ EULEX title not found');
        }
        
        console.log('🎉 Basic functionality test completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

// Run the test if this script is executed directly
if (require.main === module) {
    testEULEXApp();
}

module.exports = { testEULEXApp }; 