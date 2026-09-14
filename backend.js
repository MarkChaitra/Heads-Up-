document.addEventListener('click', function initTilt() {
    document.removeEventListener('click', initTilt); // only run once
  
    if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().then(state => {
        if (state === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        }
      });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  });
  
  function handleOrientation(event) {
    console.log(event.alpha, event.beta, event.gamma);

    if(event.gamma <= 30 && event.gamma >0){
        document.body.style.backgroundColor = 'green';  
    }
    else if(event.gamma >= -30 && event.gamma <0){
        document.body.style.backgroundColor = 'red';   
    }
    else{
        document.body.style.backgroundColor = 'white';   
    }
  }