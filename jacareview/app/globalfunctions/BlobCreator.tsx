fetch("https://i.imgur.com/gDJ1JhL.jpeg")
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    
  });