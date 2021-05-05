function getHtmlTemp(title, mainContent) {
    return  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="language" content ="en" >
      <meta name="description" content="Uploading plants website">
      <title>${title}</title>
  </head>
  <body>
      <main>
          ${mainContent}
      </main>
  </body>
  </html>
  `
  }
  
  
  module.exports = {getHtmlTemp}