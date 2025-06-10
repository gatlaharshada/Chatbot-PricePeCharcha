import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import datetime

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["pricepecharcha"]
collection = db["products"]

def insert_product(product):
    if not collection.find_one({"url": product["url"]}):
        collection.insert_one(product)
        print(f"[+] Inserted: {product['product_name']}")
    else:
        print(f"[-] Skipped (duplicate): {product['product_name']}")

# Scraper for Mamaearth
def scrape_mamaearth(url, category="Skincare"):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    product_cards = soup.select('.category-item') or soup.select('.product-item-info')
    for card in product_cards:
        try:
            name_tag = card.select_one('.product-item-name a')
            name = name_tag.get_text(strip=True)
            product_url = name_tag['href']
            price_tag = card.select_one('.price-wrapper .price')
            price_text = price_tag.get_text(strip=True) if price_tag else "0"
            price = int(''.join(filter(str.isdigit, price_text)))
            img_tag = card.select_one('img')
            img_url = img_tag['data-src'] if 'data-src' in img_tag.attrs else img_tag['src']
            product = {
                "product_name": name,
                "price": price,
                "url": product_url,
                "image_url": img_url,
                "category": category,
                "brand": "Mamaearth",
                "source": "mamaearth.in",
                "created_at": datetime.datetime.utcnow()
            }
            insert_product(product)
        except Exception as e:
            print(f"[!] Error scraping Mamaearth product: {e}")

# Scraper for The Souled Store
def scrape_thesouledstore(url, category="Fashion & Lifestyle"):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    product_cards = soup.select('.product-card')
    for card in product_cards:
        try:
            name_tag = card.select_one('.product-card__title')
            name = name_tag.get_text(strip=True)
            product_url = card.select_one('a')['href']
            full_url = f'https://www.thesouledstore.com{product_url}'
            price_tag = card.select_one('.product-card__price')
            price_text = price_tag.get_text(strip=True) if price_tag else "0"
            price = int(''.join(filter(str.isdigit, price_text)))
            img_tag = card.select_one('img')
            img_url = img_tag['data-src'] if 'data-src' in img_tag.attrs else img_tag['src']
            product = {
                "product_name": name,
                "price": price,
                "url": full_url,
                "image_url": img_url,
                "category": category,
                "brand": "The Souled Store",
                "source": "thesouledstore.com",
                "created_at": datetime.datetime.utcnow()
            }
            insert_product(product)
        except Exception as e:
            print(f"[!] Error scraping The Souled Store product: {e}")

# Additional scrapers for other platforms can be added here following similar pattern

def scrape_bewakoof(url, category="Fashion"):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    product_cards = soup.select('.product-card')
    for card in product_cards:
        try:
            name_tag = card.select_one('.product-card__title')
            name = name_tag.get_text(strip=True)
            product_url = card.select_one('a')['href']
            full_url = f'https://www.bewakoof.com{product_url}'
            price_tag = card.select_one('.product-card__price')
            price_text = price_tag.get_text(strip=True) if price_tag else "0"
            price = int(''.join(filter(str.isdigit, price_text)))
            img_tag = card.select_one('img')
            img_url = img_tag['data-src'] if 'data-src' in img_tag.attrs else img_tag['src']
            product = {
                "product_name": name,
                "price": price,
                "url": full_url,
                "image_url": img_url,
                "category": category,
                "brand": "Bewakoof",
                "source": "bewakoof.com",
                "created_at": datetime.datetime.utcnow()
            }
            insert_product(product)
        except Exception as e:
            print(f"[!] Error scraping Bewakoof product: {e}")

def scrape_headsupfortails(url, category="Pet Products"):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    product_cards = soup.select('.product-item')
    for card in product_cards:
        try:
            name_tag = card.select_one('.product-item-link')
            name = name_tag.get_text(strip=True)
            product_url = name_tag['href']
            price_tag = card.select_one('.price')
            price_text = price_tag.get_text(strip=True) if price_tag else "0"
            price = int(''.join(filter(str.isdigit, price_text)))
            img_tag = card.select_one('img')
            img_url = img_tag['data-src'] if 'data-src' in img_tag.attrs else img_tag['src']
            product = {
                "product_name": name,
                "price": price,
                "url": product_url,
                "image_url": img_url,
                "category": category,
                "brand": "Heads Up For Tails",
                "source": "headsupfortails.com",
                "created_at": datetime.datetime.utcnow()
            }
            insert_product(product)
        except Exception as e:
            print(f"[!] Error scraping Heads Up For Tails product: {e}")

def scrape_boatlifestyle(url, category="Electronics (Audio)"):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    product_cards = soup.select('.product-item')
    for card in product_cards:
        try:
            name_tag = card.select_one('.product-item-link')
            name = name_tag.get_text(strip=True)
            product_url = name_tag['href']
            price_tag = card.select_one('.price')
            price_text = price_tag.get_text(strip=True) if price_tag else "0"
            price = int(''.join(filter(str.isdigit, price_text)))
            img_tag = card.select_one('img')
            img_url = img_tag['data-src'] if 'data-src' in img_tag.attrs else img_tag['src']
            product = {
                "product_name": name,
                "price": price,
                "url": product_url,
                "image_url": img_url,
                "category": category,
                "brand": "BoAt Lifestyle",
                "source": "boat-lifestyle.com",
                "created_at": datetime.datetime.utcnow()
            }
            insert_product(product)
        except Exception as e:
            print(f"[!] Error scraping BoAt Lifestyle product: {e}")

if __name__ == "__main__":
    scrape_mamaearth("https://www.mamaearth.in/product-category/face-care", category="Face Care")
    scrape_thesouledstore("https://www.thesouledstore.com/collections/graphic-tshirts", category="Graphic T-Shirts")
    scrape_bewakoof("https://www.bewakoof.com/collections/men-tshirts", category="Fashion")
    scrape_headsupfortails("https://www.headsupfortails.com/collections/shampoo", category="Pet Products")
    scrape_boatlifestyle("https://www.boat-lifestyle.com/collections/wireless-earphones", category="Electronics (Audio)")
