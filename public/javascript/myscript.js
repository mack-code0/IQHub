let add_btn = document.querySelector(".add_question")

let all_questions_holder = {}

add_btn.addEventListener("click", function(){
    let option_holder = []

    console.log(`${this.id}`);
    let options = this.parentElement.parentElement.querySelectorAll(`.all_question_to_add #${this.id} .question .question_options .options div input`);
    let main_question = this.parentElement.parentElement.querySelector(`.all_question_to_add #${this.id} .question .question_options textarea`).value
    options.forEach(inp=>{
        option_holder.push(inp.value)
    })
    let all_holder;
    if(all_questions_holder[`${this.id}`]){
        all_questions_holder[`${this.id}`].push({question: main_question, options: option_holder})
    }else{
        all_holder = [{question: main_question, options: option_holder}]
        all_questions_holder[`${this.id}`] = all_holder
    }

    console.log(all_questions_holder);
})
