async function loadTopics(){
    document.querySelector('.site-main').replaceChildren();
    const response = await fetch(`../Heads-Up-/topics.json`);
    const data = await response.json();
    for(let topics in data){
      let selecter = document.createElement('div');
      selecter.classList.add('topic');
      selecter.textContent = topics;
      selecter.dataset.topic = topics;
      document.querySelector('.site-main').appendChild(selecter);
    }
};

window.onload = loadTopics();

let main = document.querySelector('.site-main');

main.addEventListener('click', function(e){
  let topic = e.target.closest('[data-topic]');

  if(!topic){ return;}

  localStorage.setItem("topic", topic.dataset.topic);
  window.location.href = 'pages/quiz.html';

});
