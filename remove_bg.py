from PIL import Image
import math

def remove_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    # Sample background color from corners
    corners = [pixels[0,0], pixels[width-1,0], pixels[0,height-1], pixels[width-1,height-1]]
    bg_r = sum(c[0] for c in corners) / 4
    bg_g = sum(c[1] for c in corners) / 4
    bg_b = sum(c[2] for c in corners) / 4
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            if dist < 12:
                pixels[x, y] = (r, g, b, 0)
            elif dist < 60:
                alpha = int(((dist - 12) / 48.0) * 255)
                # pre-multiply or just set alpha
                pixels[x, y] = (r, g, b, alpha)

    img.save(output_path)

remove_bg("frontend/public/logo_book.png", "frontend/public/logo_book_transparent.png")
remove_bg("frontend/public/logo_globe.png", "frontend/public/logo_globe_transparent.png")
