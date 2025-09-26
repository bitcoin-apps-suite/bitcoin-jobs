#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

def create_bitcoin_jobs_icon(size):
    """Create a Bitcoin Jobs icon with a briefcase and Bitcoin symbol"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Background circle
    padding = size * 0.1
    draw.ellipse([padding, padding, size - padding, size - padding], 
                 fill=(247, 147, 26, 255))  # Bitcoin orange
    
    # Inner circle
    inner_padding = size * 0.15
    draw.ellipse([inner_padding, inner_padding, size - inner_padding, size - inner_padding], 
                 fill=(255, 255, 255, 255))  # White
    
    # Draw briefcase shape
    briefcase_width = size * 0.5
    briefcase_height = size * 0.35
    briefcase_x = (size - briefcase_width) / 2
    briefcase_y = size * 0.4
    
    # Briefcase body
    draw.rounded_rectangle(
        [briefcase_x, briefcase_y, 
         briefcase_x + briefcase_width, briefcase_y + briefcase_height],
        radius=size * 0.03,
        fill=(34, 34, 34, 255)  # Dark gray
    )
    
    # Briefcase handle
    handle_width = briefcase_width * 0.4
    handle_x = (size - handle_width) / 2
    handle_y = briefcase_y - size * 0.08
    draw.arc([handle_x, handle_y, handle_x + handle_width, briefcase_y + size * 0.05],
             start=180, end=0, fill=(34, 34, 34, 255), width=int(size * 0.02))
    
    # Bitcoin symbol in center of briefcase
    try:
        font_size = int(size * 0.2)
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()
    
    bitcoin_symbol = "₿"
    
    # Get text bounding box
    bbox = draw.textbbox((0, 0), bitcoin_symbol, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = (size - text_width) / 2
    text_y = briefcase_y + (briefcase_height - text_height) / 2
    
    draw.text((text_x, text_y), bitcoin_symbol, fill=(247, 147, 26, 255), font=font)
    
    return img

# Create icons in multiple sizes
sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512]

# Create directories
os.makedirs('public/icons', exist_ok=True)
os.makedirs('frontend/public/icons', exist_ok=True)

for size in sizes:
    icon = create_bitcoin_jobs_icon(size)
    
    # Save to public/icons
    icon.save(f'public/icons/icon-{size}x{size}.png', 'PNG')
    
    # Save to frontend/public/icons
    icon.save(f'frontend/public/icons/icon-{size}x{size}.png', 'PNG')

# Create main favicon
favicon = create_bitcoin_jobs_icon(512)
favicon.save('public/favicon.png', 'PNG')
favicon.save('frontend/public/favicon.png', 'PNG')

# Create apple-touch-icon
apple_icon = create_bitcoin_jobs_icon(180)
apple_icon.save('public/apple-touch-icon.png', 'PNG')
apple_icon.save('frontend/public/apple-touch-icon.png', 'PNG')

print("Bitcoin Jobs icons generated successfully!")