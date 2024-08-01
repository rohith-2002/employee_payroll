if(localStorage.getItem('editUser')!==null){
    let user=JSON.parse(localStorage.getItem('editUser'));
    $('#inputName').val(user.name);
    $(`input[name="profile-image"][value="${user.image}"]`).prop('checked', true);
    $(`input[name="gridRadio"][value="${user.gender}"]`).prop('checked', true);
    user.department.forEach(dept => {
        $(`input[name="gridRadios"][value="${dept}"]`).prop('checked', true);
    });
    $('#inputState').val(user.salary);
    const [startDay, startMonth, startYear] = user.startDate.split('/');
    $('#inputDay').val(startDay);
    $('#inputMonth').val(startMonth);
    $('#inputYear').val(startYear);
    $('#inputNotes').val(user.notes);
     

    
   
}