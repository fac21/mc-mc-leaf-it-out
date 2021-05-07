function getHtmlTemp(title, header, mainContent) {
    return  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="language" content ="en" >
      <meta name="description" content="Uploading plants website">
      <link rel="stylesheet" type="text/css" href="styles.css">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap');
      </style>       
      <title>${title}</title>
  </head>
  <body>
        <div class="background"></div>
        ${header}
      <main>
          ${mainContent}
      </main>
  </body>
  </html>
  `
  }
  
  
  module.exports = {getHtmlTemp}