import os
import sys
import time
from playwright.sync_api import sync_playwright

def run_diagnostics():
    print("Starting Playwright diagnostics...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Log all console messages
        def handle_console(msg):
            print(f"[CONSOLE {msg.type}] {msg.text}")
        page.on("console", handle_console)
        
        # Log all unhandled errors
        def handle_error(err):
            print(f"[PAGE ERROR] {err.message}")
        page.on("pageerror", handle_error)
        
        print("Navigating to http://localhost:3000...")
        try:
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")
            print("Successfully loaded page.")
        except Exception as e:
            print(f"Failed to navigate: {e}")
            browser.close()
            return
            
        # Capture initial screenshot
        page.screenshot(path="initial_state.png")
        print("Captured initial state screenshot.")
        
        # Check if address input exists
        input_selector = "input[id='address-input']"
        try:
            page.wait_for_selector(input_selector, timeout=3000)
            print("Address input element found!")
        except Exception:
            print("Address input element NOT found by ID!")
            # Let's search all inputs
            inputs = page.locator("input").all()
            print(f"Found {len(inputs)} inputs on the page:")
            for i, inp in enumerate(inputs):
                print(f"  Input {i}: placeholder='{inp.get_attribute('placeholder')}', id='{inp.get_attribute('id')}', name='{inp.get_attribute('name')}'")
            browser.close()
            return

        # Type into the address input
        print("Typing 'Austin' into the address input...")
        page.fill(input_selector, "Austin")
        page.wait_for_timeout(1000) # Wait for autocomplete to trigger
        
        # Check suggestions dropdown
        page.screenshot(path="after_typing.png")
        print("Captured screenshot after typing.")
        
        # Let's inspect the DOM elements or lists
        list_items = page.locator("li").all()
        print(f"Found {len(list_items)} li elements on page.")
        for i, li in enumerate(list_items):
            print(f"  Li {i}: text='{li.inner_text()}'")
            
        # Try to click the search button
        button_selector = "button[type='submit']"
        try:
            btn = page.locator(button_selector).first
            print(f"Found submit button: text='{btn.inner_text()}'")
            print("Attempting to click submit button...")
            btn.click()
            page.wait_for_timeout(1000) # Wait for animation/transition to start
            page.screenshot(path="after_click.png")
            print("Captured screenshot after clicking search button.")
        except Exception as e:
            print(f"Error interacting with submit button: {e}")
            
        browser.close()

if __name__ == "__main__":
    run_diagnostics()
