// Button for creating new subject tab
let addSubjectBtn = document.querySelector(".add_subject .button")

// Input tag holding the name of the subject tab about to be added
let subject_name = document.querySelector(".add_subject input")
let all_subject_names = []



addSubjectBtn.addEventListener("click", ()=>{
    // Removing whitespaces from the subjact tab name so it can be added as an id
    let real_subject_name = subject_name.value.replace(/\s/g, "")
    
    all_questions_holder[`${real_subject_name}id`] = []

    // Check for special characters not allowed
    const format = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/
    if(all_subject_names.indexOf(real_subject_name)>-1 || format.test(real_subject_name)){
        addSubjectBtn.setAttribute("disabled", "true")
    }else{
        // creating the fields to accept the question and options of a particaular aubject tab using it's id
        var htm = `<button class="button dark_bg white_txt px-2 py-1 me-2 d-flex align-items-center"><i onclick="delete_subject('${real_subject_name}id', this)" class="bx bx-trash me-1"></i>
            <a onclick="clickedSubjectName(this)" data-bs-toggle="collapse"  href="#${real_subject_name}id" role="button" aria-expanded="false" aria-controls="${real_subject_name}id">${subject_name.value}</a>
        </button>`
        $(".exam_subject_names").append(htm);

        var newHtml = `<div id="${real_subject_name}id" class="form_1 w-100 collapse multi-collapse">
        <h6 class="thick mb-4 mt-5">${subject_name.value} <span class="ms-1 light_purple_bg px-1 py-1 ${real_subject_name}id_current_number">[No. of Questions: ]</span></h6>
        <input type="hidden" class="question_edit_mode" value="false">
        <div class="question mb-5 w-100">
            <div class="question_options w-100">
                <textarea name="" id="${real_subject_name}id_main_question" class="w-100 mb-2" rows="4"></textarea>
                <div class="options w-100 d-flex flex-wrap">
                    <div class="w-50 mb-2 pe-3">
                        <input class="form-check-input" type="radio" name="correct_option" id="option_a" value="A">
                        <label class="thick" for="option_a">A.</label>
                        <input type="text" id="option_a" class="w-100 ${real_subject_name}id_options">
                    </div>
                    <div class="w-50 mb-2 ps-3">
                        <input class="form-check-input" type="radio" name="correct_option" id="option_c" value="C">
                        <label class="thick" for="option_c">C.</label>
                        <input type="text" id="option_c" class="w-100 ${real_subject_name}id_options">
                    </div>
                    <div class="w-50 mt-2 pe-3">
                        <input class="form-check-input" type="radio" name="correct_option" id="option_b" value="B">
                        <label class="thick" for="option_b">B.</label>
                        <input type="text" id="option_b" class="w-100 ${real_subject_name}id_options">
                    </div>
                    <div class="w-50 mt-2 ps-3">
                        <input class="form-check-input" type="radio" name="correct_option" id="option_d" value="D">
                        <label class="thick" for="option_d">D.</label>
                        <input type="text" id="option_d" class="w-100 ${real_subject_name}id_options">
                    </div>
                </div>
                </div>
            </div>
        </div>`

        $(".all_question_to_add").append(newHtml);
        all_subject_names.push(real_subject_name)
        subject_name.value = ""
        addSubjectBtn.setAttribute("disabled", "true")
        document.querySelector(`a[href*='${real_subject_name}id']`).click()
    }
})


// Function for the subject tab button
let clickedSubjectName = (m)=>{
    const clickedTabName = m.getAttribute("href").substring(1)

    const checkTabEditMode = document.querySelector(`#${clickedTabName} .question_edit_mode`).value.split("_")
    if(checkTabEditMode[0]=="true"){
        editing_question_btn.removeAttribute("disabled")
        editing_question_btn.setAttribute("onclick", `submit_edited_question('${clickedTabName}_q_${checkTabEditMode[1]}', ${checkTabEditMode[1]})`)
    }else{
        editing_question_btn.setAttribute("disabled", "true")
        editing_question_btn.setAttribute("onclick", "")
    }
    
    global_edit_mode = clickedTabName

    // When the subject tab is clicked, we need to check if the tab is active or not
    if(m.getAttribute("aria-expanded")==="false"){
        // if the tab is not active, set the add_question button's id to null
        add_question_btn.setAttribute("id", "")
        // editing_question_btn.setAttribute("id", "")
    }else{
        // if the tab is active, set the add_question button's id to the name of the particular tab cliked
        add_question_btn.setAttribute("id", `${clickedTabName}_add_question_btn`)
        // editing_question_btn.setAttribute("id", `${clickedTabName}_submit_edit_question_btn`)
    }
    

    let subject_name_btn_array = document.querySelectorAll(".exam_subject_names button a")
    let all_question_to_add_array = document.querySelector(".all_question_to_add").childNodes

    // Looping through the tabs to remove the tabs that were'nt clicked on from the view
    for(let i = 0; i<subject_name_btn_array.length; i++){
        if(subject_name_btn_array[i].getAttribute("href").substring(1) !== clickedTabName){
            subject_name_btn_array[i].setAttribute("aria-expanded", "false");
            subject_name_btn_array[i].setAttribute("class", "collapsed");
            all_question_to_add_array[i].classList.remove("show")
        }
    }
}



const checkInput = (m)=>{
    if(m.value.length < 3 || m.value == ""){
        addSubjectBtn.setAttribute("disabled", "true")
    }
    else{
        addSubjectBtn.removeAttribute("disabled")
    }
}