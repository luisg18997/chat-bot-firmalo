import React, {Fragment, useEffect, useRef, useState} from 'react';
import './bot.css'
import './robot.css'
import User from './assets/ninjaBot.png'

function App() {
  const preguntasInicial = [{msg: "Necesito saber mas sobre firmas simples", data: 'question1-1', resBot: 'Que te gustaria saber sobre las firmas simples'}, {msg: "Necesito saber mas sobre firmas certificadas", data: 'question1-2', resBot: 'Que te gustaria saber sobre las firmas certificadas'}, {msg: "Cuales planes ofrecen" , data: 'question1-3' , resBot: 'De cual de nuestros planes te gustaria saber mas'}, {msg: "Como los puedo contactar" , data: 'question1-4', resBot: 'Nos puedes contactar por los siguientes medios'}];
  // chat
  const [chatLogs, setChatLogs] = useState([])
  // opciones de preguntas
  const [buttons, setButtons] = useState([])
  const [firstMsg, setFirstMsg] = useState(true)
  const [loaded, setLoaded] = useState(true)

  //referencia para el scrolltop
  const msgRef = useRef();
  //preguntas predeterminadas
  
  const preguntasFirmaSencilla = [{msg: "Que es una firma simple", data: 'question2-1', resBot: (<>Son firmas sencillitas. <br /><br /> Algo mas que te gustaria saber sobre las firmas simples</>)}, {msg: "Cuanto cuesta una firma simple", data: 'question2-2', resBot: (<>Los planes para las firmas sencillas comienzan en $9.99 conoce mas <a href="firmalo.io/planes" target="_blank">aqui</a>. <br/><br/> Algo mas que te gustaria saber sobre las firmas simples</>)}, {msg: "Requerimientos firma simple", data: 'question2-3', resBot: (<>Los requerimientos son sencillos. Sigue este enlace para saber mas <a href="firmalo.io/planes" target="_blank">pagina requerimientos</a>. <br/><br/> Algo mas que te gustaria saber sobre las firmas simples</>)}];
  const preguntasFirmaCertificada = [{msg: "Que es una firma Certificada", data: 'question3-1', resBot: (<>Son firmas cerificadas. <br/><br/> Algo mas que te gustaria saber sobre las firmas cerificadas</>)}, {msg:  "Cuanto cuesta una firma Certificada", data: 'question3-2', resBot: (<>Los planes para las firmas certificadas comienzan en $49.99 conoce mas <a href="firmalo.io/planes" target="_blank">aqui</a>. <br/><br/> Algo mas que te gustaria saber sobre las firmas certificadas</>)}, {msg: "Requerimientos firma Certificada", data: 'question3-3', resBot: (<>Los requerimientos son varios. Sigue este enlace para saber mas <a href="firmalo.io/planes" target="_blank">pagina requerimientos</a>. <br/><br/> Algo mas que te gustaria saber sobre las firmas certificadas</>)}];
  const preguntasPlanes = [{msg: "Plan individual", data: 'question4-1', resBot: (<>El plan individual solo incluye firmas simples. <br/><br/> Algo mas que te gustaria saber sobre nuestros planes</>)}, {msg: "Plan empresarial", data: 'question4-2', resBot: (<>El plan empresarial incluye firmas simples y certificadas. <br/><br/> Algo mas que te gustaria saber sobre nuestros planes</>)}, {msg: "Plan Mega", data: 'question4-3', resBot: (<>El plan mega incluye firmas simples y certificadas ilimitadas. <br/><br/> Algo mas que te gustaria saber sobre nuestros planes</>)}];  
  const preguntasContacto = [{msg: (<>Numero de telefono:<a href="#">+123456789</a></>)}, {msg: (<>Correo electronico:<a href="#">info@firmalo.io</a></>)}, {msg: "Otro tema", data: 'restartQuestions', resBot: 'En que mas puedo ayudarte.?'}];


  useEffect(() => {
    const InitialChat = () => {
      setTimeout(() => {
        setChatLogs([{sender: 'bot', msg: 'Hola, en que puedo ayudarte.?'}]);
        setButtons(preguntasInicial)
      }, 500)
    }
    InitialChat();
  },[])

  const Bot = (<div className="chatbot-container">
  <div id="chatbot">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
  <div id="chatbot-corner"></div>
  <div id="antenna">
    <div id="beam"></div>
    <div id="beam-pulsar"></div>
  </div>
</div> );

  //funcion que se utiliza para el scrollTop
const scrollToBottom = () => msgRef.current.scrollTop = msgRef.current.scrollHeight;;

  //envio de pregunta
const  onSendQuestion = async(e, option) => {
  e.preventDefault();
  setLoaded(true)
  const bot = window.document.getElementsByClassName('chatbot-container')
  let msgUser = '', msgBot = '', myQuestionsData = [];
  //vacio las preguntas a realizar
  setButtons([]);
  switch(option.data){
    //respuestas iniciales
    case 'question1-1':
      //msgUser es lo que va a decir el usuario 
      msgUser = option.msg
      //msgBot texto del bot
      msgBot = option.resBot; 
      //myQuestionsData va a representar los botones/preguntas a generar
      myQuestionsData = preguntasFirmaSencilla;
      break;
    case 'question1-2':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasFirmaCertificada;
      break;
    case 'question1-3':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasPlanes;
      break;
    case 'question1-4':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasContacto;
      break;
    //respuestas firmas sencillas
    case 'question2-1':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasFirmaSencilla.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    case 'question2-2':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasFirmaSencilla.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    case 'question2-3':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasFirmaSencilla.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    //respuestas firmas cerificadas
    case 'question3-1':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasFirmaCertificada.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    case 'question3-2':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasFirmaCertificada.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    case 'question3-3':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasFirmaCertificada.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    //respuestas planes
    case 'question4-1':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasPlanes.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    case 'question4-2':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasPlanes.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;
    case 'question4-3':
      msgUser = option.msg;
      msgBot = option.resBot; 
      myQuestionsData = preguntasPlanes.filter(question => question.msg !== option.msg);
      myQuestionsData.push(preguntasContacto[2]); 
      break;

    case 'restartQuestions':
      msgUser = option.msg;
      msgBot = option.resBot;
      myQuestionsData = preguntasInicial
      break;

    default:
      msgUser = option.msg;
      msgBot = option.resBot;
      myQuestionsData = preguntasInicial
  }
  let chats = [...chatLogs];
  //anexo la respuesta del usuario
  chats.push({sender: 'user', msg: msgUser});
  bot[bot.length -1].style.top = "154px";
  
  // se almacena en el estado 
  setChatLogs(chats)
  const msgAvatar = window.document.getElementsByClassName('msg-avatar');
  botTypingMsg()
  setTimeout(()  => {
    //envio la respues del bot
    chats.push({sender: 'bot', msg: msgBot});
   //setFirstMsg(false)
    setLoaded(false)
    setChatLogs(chats)
    // ingreso las opciones a seleccionar
    console.log(bot)

    console.log(msgAvatar[msgAvatar.length - 1].append(bot[bot.length -1]));
    bot[bot.length -1].style.top = '-8px'
    setButtons(myQuestionsData)
    scrollToBottom();
  }, 3000)
}

const botTypingMsg = () => {
  window.document.querySelector(".chatbot-container .dot:nth-child(2)").style.animation = "pulse-mouth-hide 1s ease-in-out";
  window.document.querySelector(".chatbot-container #antenna").style.animation = "antenna-disappear 1s ease-in-out";
  window.document.querySelector(".chatbot-container #antenna").style.animationFillMode = "forwards";
  window.document.querySelector(".chatbot-container #antenna #beam").style.animation = "beam-disappear 1s ease-in-out";
  window.document.querySelector(".chatbot-container #antenna #beam-pulsar").style.visibility = "hidden";
  setTimeout(function() { 
    window.document.querySelector(".chatbot-container .dot:nth-child(1)").style.animation = "pulse-typing 3s infinite ease-in-out";
    window.document.querySelector(".chatbot-container .dot:nth-child(2)").style.animation = "pulse-typing 3s infinite ease-in-out";
    window.document.querySelector(".chatbot-container .dot:nth-child(2)").style.animationDelay = "0.2s";
    window.document.querySelector(".chatbot-container .dot:nth-child(3)").style.animation = "pulse-typing 3s infinite ease-in-out";
    window.document.querySelector(".chatbot-container .dot:nth-child(3)").style.animationDelay = "0.4s";
  }, 1000);
  setTimeout(function() { 
    window.document.querySelector(".chatbot-container .dot:nth-child(1)").style.animation = "pulse-winking 5s infinite ease-in-out";
    window.document.querySelector(".chatbot-container .dot:nth-child(2)").style.animation = "pulse-mouth-show 4s ease-in-out";
    window.document.querySelector(".chatbot-container .dot:nth-child(2)").style.animationFillMode = "forwards";
    window.document.querySelector(".chatbot-container .dot:nth-child(2)").style.animationDelay = "0s";
    window.document.querySelector(".chatbot-container .dot:nth-child(3)").style.animation = "pulse-winking 5s infinite ease-in-out";
    window.document.querySelector(".chatbot-container .dot:nth-child(3)").style.animationDelay = "0s";
    window.document.querySelector(".chatbot-container #antenna").style.animation = "antenna-appear 1s ease-in-out";
    window.document.querySelector(".chatbot-container #antenna").style.animationFillMode = "forwards";
    window.document.querySelector(".chatbot-container #antenna #beam").style.animation = "beam-appear 1s ease-in-out";
    window.document.querySelector(".chatbot-container #antenna #beam-pulsar").style.visibility = "visible";
    window.document.querySelector(".chatbot-container #antenna #beam-pulsar").style.animation = "beam-pulsar 3s infinite ease-in-out";
  }, 3000);
}


  return (
    <div className="home">
      <div id="body"> 
        <div className="chat-box">
          <div className="chat-box-header">
            Firmalo Preguntas Frecuentes
          </div>
          <div className="chat-box-body">
            <div className="chat-box-overlay">   </div>
            <div className="chat-logs" ref={msgRef}>  
            {Bot}
              {
                
                chatLogs.map((chat, id) => (
                    <div key={id} className={`chat-msg ${chat.sender === "bot"? "self": "user"}`}>
                      <span className='msg-avatar'>
                        {
                          chat.sender === "user"  &&
                          <img src={User} alt="user"/>                          
                        }
                      </span>
                      <div>
                        <div className='cm-msg-text'>{chat.msg}</div>
                      </div>
                      <div className="msg-button-container">
                        {
                          id === chatLogs.length-1 &&
                        buttons.map((option,key) => (
                          <button key={key} type="button" className="chat-submit" onClick={(e) => onSendQuestion(e, option)} /* data-question-id={option.data} */>{option.msg}</button>
                        ))
                        
                        }
                      </div>
                    </div>
                ))
              }
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default App;
