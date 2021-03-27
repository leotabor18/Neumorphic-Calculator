const input = document.querySelector('#input');
const history = document.querySelector('#history');
const nums = document.querySelectorAll('.key_number');
const equal = document.querySelector('.key_eq');
const clear = document.querySelector(`.key_op[data-op='clear']`);
const backspace = document.querySelector(`.key_op[data-op='backspace']`);

const container = [];
const history_array = [];
let press = false;
nums.forEach(element => {
    element.addEventListener('click', event =>{
        if(input.value != '0'){
            input.value = input.value + event.toElement.innerText;
        }else{
            input.value = event.toElement.innerText;      
        }
    });
    }
);
equal.addEventListener('click', () =>{
    if(container && container.length){
        container.push({innerText: parseFloat(input.value)});

        history.value = history.value + input.value;
        const res = evaluate(container);
        if(res == Infinity){
            input.value = 'Syntax Error';
            container.length = 0;

            return;
        }
        input.value = res;
        press = true;
  }
});

clear.addEventListener('click', () =>{
    input.value = 0;
    container.length = 0;
    history.value = 0;
    history_array.length = 0;
    press = false;
});

backspace.addEventListener('click', () =>{
    if(input.value != 0){
        input.value = input.value.substr(0, input.value.length - 1);
        if(input.value.length == 0){
            input.value = 0;
            press = false;
        }
    }
});
for (const opName of ['add', 'subtract', 'multiply', 'divide']){
    document.querySelector(`.key_op[data-op=${opName}`)
        .addEventListener('click', event =>{
            const history_val = input.value + event.toElement.innerText;
            
            if(press){
                history_array.length = 0;
                history.value = input.value;  
                press = false;
            }
  
            history_array.push(history_val);

            history.value = history_array.join("");
            opCallBack(opName);

        });
}

const opCallBack = (opName) =>{
    let currinnerText = parseFloat(input.value);
    if(container && container.length){
        container.push({innerText : currinnerText});
        const result = evaluate(container);

        container.push({innerText: result});
        container.push({innerText: opName});

        input.value = "0";
    }else{
        container.push({innerText: currinnerText});
        container.push({innerText: opName});
        input.value = "0";

    }
}

const evaluate = buffer => {
   try {
        const secInput = buffer.pop().innerText;
        const operator = buffer.pop().innerText;
        const firstInput = buffer.pop().innerText;
        
        switch(operator){
            case 'add':
                return firstInput + secInput;
                break;
            case 'subtract':
                return firstInput - secInput;
                break;
            case 'multiply':
                return firstInput * secInput;
                break;
            case 'divide':
                return firstInput / secInput;
                break;
            default: 
                return secInput;
    }
   } catch (error) {
        input.value = 'Syntax Error';
   }
}
