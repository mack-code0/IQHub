// Button for adding question to question json object
const add_btn = document.querySelector(".add_question")

// Holds all the questions in a json formmat/object format
const all_questions_holder = {}

add_btn.addEventListener("click", function(){
    if(!this.id){
        alert("Select a Subject!")
    }else{
        // The id to the current active tab gotten from the id of add_btn
        const question_tab_id  = this.id.split("_")[0]
        // Question about to be added
        const main_question = document.querySelector(`#${question_tab_id} .question .question_options textarea`)
        // Options of the question
        const options = document.querySelectorAll(`#${question_tab_id} .question .question_options .options div input`);
        // Array to hold the options after looping through them
        const option_holder = []
        options.forEach(inp=>{
            option_holder.push(inp.value)
        })
    
        const verify_options = option_holder.findIndex(e=>e.length<1)
        if(main_question.value.length < 5 || verify_options !== -1){
            alert("Invalid Inputs")
        }else{
            const next_question_number = document.querySelector(`.${question_tab_id}_current_number`)
            // Check if the tab this question belongs to is already in the object holding all the questions
            // If the tab is already present, then update it by pushing the question to the tab it belongs, else create the tab and assign the new question to the tab
            if(all_questions_holder[`${this.id}`]){
                const question_model = {question: main_question.value, options: option_holder}
                all_questions_holder[`${this.id}`].push(question_model)
                // Adding new question to the view
                add_new_question(question_model, all_questions_holder[`${this.id}`].length, question_tab_id)
                next_question_number.innerHTML = all_questions_holder[`${this.id}`].length + 1 +"."
            }else{
                all_questions_holder[`${this.id}`] = [{question: main_question.value, options: option_holder}]
                // Adding new question to the view
                add_new_question(all_questions_holder[`${this.id}`][0], 1, question_tab_id)
                next_question_number.innerHTML = 2 + "."
            }
        
            // Set the input values to none
            main_question.value = ""
            options.forEach(inp=>{
                inp.value = ""
            })
        }
    }
})




const add_new_question = (question, question_index, question_tab_id)=>{
    const newly_added_question = `<div class="mb-5 w-100 added_questions">
        <span class="thick">${question_index}.</span>
        <h6 class="thick mt-2">${question.question}</h6>
        <div class="d-flex flex-wrap">
            <div class="w-50 mb-1 pe-3">
                <span class="thick">A.</span>
                <h6 class="less_thick">${question.options[0]}</h6>
            </div>
            <div class="w-50 mb-1 ps-3">
                <span class="thick">C.</span>
                <h6 class="less_thick">${question.options[1]}</h6>
            </div>
            <div class="w-50 mt-1 pe-3">
                <span class="thick">B.</span>
                <h6 class="less_thick">${question.options[2]}</h6>
            </div>
            <div class="w-50 mt-1 ps-3">
                <span class="thick">D.</span>
                <h6 class="less_thick">${question.options[3]}</h6>
            </div>
        </div>
    </div>`
    $(`#${question_tab_id}`).append(newly_added_question);
}



