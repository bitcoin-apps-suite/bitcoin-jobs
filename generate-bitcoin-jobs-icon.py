#!/usr/bin/env python3
"""
Generate Bitcoin Jobs icon with turquoise color scheme
Creates all required sizes for web app and PWA
"""

from PIL import Image, ImageDraw
import os

def create_bitcoin_jobs_icon(size):
    """Create a Bitcoin Jobs icon with turquoise theme"""
    # Create a new image with turquoise gradient background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Turquoise gradient colors
    turquoise = (64, 224, 208)  # Medium turquoise
    dark_turquoise = (0, 206, 209)  # Dark turquoise
    
    # Create gradient background
    for y in range(size):
        ratio = y / size
        r = int(turquoise[0] * (1 - ratio) + dark_turquoise[0] * ratio)
        g = int(turquoise[1] * (1 - ratio) + dark_turquoise[1] * ratio)
        b = int(turquoise[2] * (1 - ratio) + dark_turquoise[2] * ratio)
        draw.rectangle([(0, y), (size, y + 1)], fill=(r, g, b, 255))
    
    # Add rounded corners
    corner_radius = size // 8
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=corner_radius, fill=255)
    
    # Apply mask for rounded corners
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0))
    output.putalpha(mask)
    img = output
    draw = ImageDraw.Draw(img)
    
    # Draw briefcase with Bitcoin symbol
    briefcase_color = (255, 255, 255, 230)
    line_width = max(size // 20, 2)
    
    # Briefcase dimensions
    case_width = size * 0.6
    case_height = size * 0.4
    case_x = (size - case_width) / 2
    case_y = size * 0.35
    
    # Draw briefcase body
    draw.rounded_rectangle(
        [(case_x, case_y), (case_x + case_width, case_y + case_height)],
        radius=size // 20,
        outline=briefcase_color,
        width=line_width,
        fill=None
    )
    
    # Draw handle
    handle_width = case_width * 0.4
    handle_height = size * 0.15
    handle_x = (size - handle_width) / 2
    handle_y = case_y - handle_height * 0.7
    
    draw.arc(
        [(handle_x, handle_y), (handle_x + handle_width, handle_y + handle_height)],
        start=0, end=180,
        fill=briefcase_color,
        width=line_width
    )
    
    # Draw Bitcoin B symbol inside briefcase (simplified)
    # Create B shape with two horizontal bars
    b_width = case_width * 0.35
    b_height = case_height * 0.6
    b_x = (size - b_width) / 2
    b_y = case_y + (case_height - b_height) / 2
    
    # Vertical line of B
    draw.rectangle(
        [(b_x, b_y), (b_x + line_width * 1.5, b_y + b_height)],
        fill=briefcase_color
    )
    
    # Top horizontal bar
    bar_width = b_width * 0.8
    draw.ellipse(
        [(b_x, b_y), (b_x + bar_width, b_y + b_height * 0.45)],
        outline=briefcase_color,
        width=line_width
    )
    
    # Bottom horizontal bar
    draw.ellipse(
        [(b_x, b_y + b_height * 0.45), (b_x + bar_width, b_y + b_height)],
        outline=briefcase_color,
        width=line_width
    )
    
    # Add vertical bars through B for Bitcoin symbol
    bar_offset = b_width * 0.15
    bar_top = b_y - size * 0.05
    bar_bottom = b_y + b_height + size * 0.05
    
    # Left bar
    draw.rectangle(
        [(b_x - bar_offset, bar_top), (b_x - bar_offset + line_width, bar_bottom)],
        fill=briefcase_color
    )
    
    # Right bar
    draw.rectangle(
        [(b_x + bar_width - bar_offset, bar_top), (b_x + bar_width - bar_offset + line_width, bar_bottom)],
        fill=briefcase_color
    )
    
    return img

def main():
    """Generate all required icon sizes"""
    
    # Icon sizes for various purposes
    sizes = {
        'favicon.ico': [16, 32, 48],  # Multi-size ICO
        'favicon-16x16.png': 16,
        'favicon-32x32.png': 32,
        'favicon-48x48.png': 48,
        'icon-72x72.png': 72,
        'icon-96x96.png': 96,
        'icon-128x128.png': 128,
        'icon-144x144.png': 144,
        'icon-152x152.png': 152,
        'icon-192x192.png': 192,
        'icon-384x384.png': 384,
        'icon-512x512.png': 512,
        'apple-touch-icon.png': 180,
        'logo.png': 512,  # Main logo
    }
    
    # Create public directory if it doesn't exist
    os.makedirs('public', exist_ok=True)
    os.makedirs('public/icons', exist_ok=True)
    
    print("🎨 Generating Bitcoin Jobs icons with turquoise theme...")
    
    # Generate each icon size
    for filename, size_info in sizes.items():
        if filename == 'favicon.ico':
            # Create multi-size ICO file
            icons = []
            for size in size_info:
                icons.append(create_bitcoin_jobs_icon(size))
            icons[0].save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
            print(f"✅ Created {filename} (multi-size)")
        else:
            size = size_info
            icon = create_bitcoin_jobs_icon(size)
            
            # Determine path
            if filename.startswith('icon-'):
                path = f'public/icons/{filename}'
            elif filename in ['favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png', 
                             'apple-touch-icon.png', 'logo.png']:
                path = f'public/{filename}'
            else:
                path = f'public/icons/{filename}'
            
            icon.save(path, 'PNG', optimize=True)
            print(f"✅ Created {filename} ({size}x{size})")
    
    # Also save main favicon for Next.js
    icon_32 = create_bitcoin_jobs_icon(32)
    icon_32.save('public/favicon.png', 'PNG', optimize=True)
    print("✅ Created favicon.png (32x32)")
    
    print("\n🚀 All icons generated successfully!")
    print("📁 Icons saved in public/ and public/icons/")

if __name__ == "__main__":
    main()