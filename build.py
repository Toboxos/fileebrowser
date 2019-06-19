with open('filebrowser.php', 'w') as target:
    
    # Read html data
    html = ""
    with open("layout.html", "r") as fHtml:
        html = fHtml.read()
    fHtml.closed

    # Read php data
    php = ""
    with open("logic.php", "r") as fPHP:
        php = fPHP.read()
    fPHP.closed

    # Read javascript
    script = ""
    with open("script.js", "r") as fScript:
        script = fScript.read()
    fScript.closed

    # Read css
    css = ""
    with open("style.css", "r") as fStyle:
        css = fStyle.read()
    fStyle.closed

    # Combine files
    html = html.replace("{%PHP%}", php)
    html = html.replace("{%CSS%}", css)
    html = html.replace("{%JAVASCRIPT%}", script)
    
    # Write data out
    target.write(html)

target.closed