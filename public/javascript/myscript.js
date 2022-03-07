// Button for adding question to question json object
const add_question_btn = document.querySelector(".add_question")
const editing_question_btn = document.querySelector(".submit_edit_question")
let global_edit_mode = ""

const checkErrors = (theId, cb)=>{
    // The id to the current active tab gotten from the id of add_question_btn
    const question_tab_id  = theId.split("_")[0]
        
    // Question about to be added
    const main_question = document.querySelector(`#${question_tab_id} .question .question_options textarea`)
    
    // get the correct option
    const get_correct_option = document.querySelectorAll(`#${question_tab_id} .question .question_options div input[type*='radio']`)
    // Options of the question
    let options = document.querySelectorAll(`#${question_tab_id} .question .question_options .options div input[type*='text']`);
    
    // Variable to hold the answer to the question
    let correct_option_holder = ""
    // Array to hold the options after looping through them
    const option_holder = []

    for(let i=0; i<4; i++){
        // Push the value of the options into the option_holder array
        option_holder.push(options[i].value)
        if(get_correct_option[i].checked){
            // Push the value of the checked option to the correct_option_holder variable
            correct_option_holder = get_correct_option[i].value
        }
    }

    // Check if option fields are not empty
    const verify_options = option_holder.findIndex(e=>e.length<1)

    if(main_question.value.length < 5 || verify_options !== -1){
        cb({msg: "Invalid Inputs"}, {})
    }else if(correct_option_holder.length<=0){
        cb({msg: "Select an Option"}, {})
    }else{
        cb({msg: ""}, {
            question_tab_id,
            question: main_question.value,
            options: option_holder,
            correct_option: correct_option_holder 
        })
    }
}


// Holds all the questions in a json formmat/object format
const all_questions_holder = {}

add_question_btn.addEventListener("click", function(){
    if(!this.id){
        alert("Select a Subject!")
    }else{
        // The id to the current active tab gotten from the id of add_question_btn
        const the_tab_id  = this.id
        
        checkErrors(the_tab_id, (err, data)=>{
            if(err.msg){
                return alert(err.msg)
            }
            
            document.querySelector(`.${data.question_tab_id}_current_number`)
            
            const question_model = {question: data.question, options: data.options, answer: data.correct_option}
            all_questions_holder[`${data.question_tab_id}`].push(question_model)
            // Adding new question to the view
            add_new_question(question_model, all_questions_holder[`${data.question_tab_id}`].length, data.question_tab_id)
            

            // Update the number of questions
            count_questions(data.question_tab_id)

            // Empty the input fields
            emptyInputFields(data.question_tab_id)    
        })
    }
})



const add_new_question = (question, question_index, question_tab_id)=>{
    const newly_added_question = `<div class="mb-5 w-100 added_questions ${question_tab_id}_qst_${question_index}">
    <div class="d-flex align-items-center mb-3">
        <span class="thick question_index">${question_index}.</span>
        <button onclick="edit_question_btn(this)" class="button green_bg white_txt ms-2 px-2 py-1 edit_question_btn d-flex align-items-center"><i class="bx bx-pencil me-1"></i> Edit</button>
        <button onclick="delete_question_btn(this, '${question_index}')" class="button reddish_bg white_txt ms-2 px-2 py-1 delete_question_btn d-flex align-items-center"><i class="bx bx-trash me-1"></i> Delete</button>
    </div>
        <h6 class="thick added_question mt-2 mb-0">${question.question}</h6>
        <small class="thick c_option green_txt mb-2">- Ans. ${question.answer}</small>
        <div class="d-flex added_question_options flex-wrap">
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

    editing_question_btn.setAttribute("disabled", "true")
    editing_question_btn.setAttribute("onclick", "")
    $(`#${question_tab_id}`).append(newly_added_question);
}





const edit_question_btn = (e)=>{
    const tab_section_to_edit = e.parentElement.parentElement.parentElement.getAttribute("id")
    // Question about to be added
    const question_to_edit = document.querySelector(`#${tab_section_to_edit} .question .question_options textarea`)
     // Options of the question
    const options_to_edit = document.querySelectorAll(`#${tab_section_to_edit} .question .question_options .options div input[type*='text']`);
    
    question_to_edit.value = e.parentElement.parentElement.querySelector(".added_question").innerHTML
    options_to_edit.forEach((op, opIndex)=>{
        op.value = e.parentElement.parentElement.querySelectorAll(".added_question_options h6")[opIndex].innerHTML
    })
    // Question Index
    const question_index = e.parentElement.parentElement.querySelector("div .question_index").innerHTML.replace(".", "")
    editing_question_btn.setAttribute("onclick", `submit_edited_question('${tab_section_to_edit}_q', '${question_index}')`)
    editing_question_btn.removeAttribute("disabled")
    document.querySelector(`#${tab_section_to_edit} .question_edit_mode`).value = `true_${question_index}`
}


const submit_edited_question = function(e, q_index){
    checkErrors(e, (err, data)=>{
        if(err.msg){
            return alert(err.msg)
        }

        const questionTabId = data.question_tab_id
        // Update the question in the question holder
        all_questions_holder[questionTabId][q_index-1] = {
            question: data.question,
            options: data.options,
            answer: data.correct_option
        }
    
        // Update the question in the view
        document.querySelector(`.${questionTabId}_qst_${q_index} .added_question`).innerHTML = data.question
        document.querySelector(`.${questionTabId}_qst_${q_index} .c_option`).innerHTML = "- Ans. "+data.correct_option
        document.querySelectorAll(`.${questionTabId}_qst_${q_index} .added_question_options h6`).forEach((inp, index)=>{
            inp.innerHTML = data.options[index]
        })
        
        emptyInputFields(questionTabId)
    
        editing_question_btn.setAttribute("disabled", "true")
        editing_question_btn.setAttribute("onclick", "")
        document.querySelector(`#${questionTabId} .question_edit_mode`).value = "false"
    })
}



const delete_question_btn = (e, q_index)=>{
    const tab_section_to_edit = e.parentElement.parentElement.parentElement.getAttribute("id")
    const newArrayOfQuestions = all_questions_holder[tab_section_to_edit].filter((el, index)=>{
        return index+1 != q_index
    })

    all_questions_holder[tab_section_to_edit] = [...newArrayOfQuestions]
    document.querySelectorAll(`#${tab_section_to_edit} .added_questions`).forEach(e=>{
        e.remove()
    })
    all_questions_holder[tab_section_to_edit].forEach((question, index)=>{
        add_new_question(question, index+1, tab_section_to_edit)
    })

    count_questions(tab_section_to_edit)

    editing_question_btn.setAttribute("disabled", "true")
    editing_question_btn.setAttribute("onclick", "")
}


const delete_subject = (id, btn)=>{
    if(confirm("Are you sure you want to delete this?")){
        
        delete all_questions_holder[id]
        const tempArray = all_subject_names.filter(e=>e!==id.substring(0, id.length - 2))
        all_subject_names = tempArray

        count_questions(id)

        document.querySelector(`#${id}`).remove()
        btn.parentElement.remove()

        if(typeof all_subject_names[0] !== "undefined"){
            const next_tab  = document.querySelector(`a[href*='${all_subject_names[0]}id']`)
            if(next_tab.getAttribute("aria-expanded") !== "true"){
                next_tab.click()
            }
        }
    }
}


const count_questions = (id)=>{
    if(typeof all_questions_holder[id] !== "undefined"){
        document.querySelector(`.${id}_current_number`).innerHTML = `[No. of Questions: ${all_questions_holder[id].length}]`
    }

    let total_question_numbers = 0
    for(const key in all_questions_holder){
        total_question_numbers += all_questions_holder[key].length
    }
    document.querySelector(".total_questions span").innerHTML  = total_question_numbers
}



const emptyInputFields = (id)=>{
    document.querySelector(`#${id} .question .question_options textarea`).value = ""
    for(let i=0; i<4; i++){
        document.querySelectorAll(`#${id} .question .question_options .options div input[type*='text']`)[i].value = ""
        document.querySelectorAll(`#${id} .question .question_options div input[type*='radio']`)[i].checked = false
    } 
}

document.querySelector("body").addEventListener("keydown", (e)=>{
    const ctrl_key = e.ctrlKey
    const enter_key = e.key === "Enter"
    if(e.key === "\n" || ctrl_key && enter_key == true){
        e.preventDefault()
        if(document.querySelector(`#${global_edit_mode} .question_edit_mode`).value.split("_")[0] == "true"){
            editing_question_btn.click()
        }else{
            add_question_btn.click()
        }
    }
})