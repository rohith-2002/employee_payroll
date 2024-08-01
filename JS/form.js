$(document).ready(function () {
    $('#submit').on('click', function () {
        const name = $('#inputName').val();
        const profile = $('input[name="profile-image"]:checked').val();
        const gender = $('input[name="gridRadio"]:checked').val();
        const department = $('input[name="gridRadios"]:checked').map(function(){
            return $(this).val();
        }).get();
        const salary = $('#inputState').val();
        const startDate = $('#inputDay').val() + '/' + $('#inputMonth').val() + '/' + $('#inputYear').val();
        const notes = $('#inputNotes').val();
        

        const newUser = {
            name: name,
            profile: profile,
            gender: gender,
            department: department,
            salary: salary,
            startDate: startDate,
            notes: notes
        };

        console.log(newUser);   

        if(localStorage.getItem('editUser')!==null){
            const user=JSON.parse(localStorage.getItem('editUser'));
            id=user.id;
            $.ajax({
                url: 'http://localhost:3000/Users/'+ id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
                success: function (res) {
                    console.log(res);
                    alert('Data updated successfully');
                    window.opener.location.reload();
                    window.location.replace("employedetails.html");
                },
                error: function (err) {
                    console.log(err);
                }
            });
            localStorage.removeItem('editUser');
        }
        
        else{
        
            $.ajax({
                url: 'http://localhost:3000/Users',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
                success: function (res) {
                    console.log(res);
                    alert('Data saved successfully');
                    window.opener.location.reload();
                    window.location.replace("employedetails.html");
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }

      
    });

    function fetchdetails(){
        $.ajax({
            url: 'http://localhost:3000/Users',
            type: 'GET',
            success: function (res) {
                 displayUsers(res);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
  

    function displayUsers(users) {
        const userTableBody = $('#table-body');
        userTableBody.empty();

        
        users.forEach(user => {
            const userRow= `
            <tr>
                    <td>
                        <img src="${user.profile}" alt="img1" width="35" height="35">
                    </td>
                    <td><div class="name-div">
                       
                        <p class="single-line name-p">${user.name}</p>
                    </div></td>
                    <td>${user.gender}</td>
                    <td><div class="dept_div">
                        <div class="dept"><p>${user.department[0]}</p></div>
                        <div class="dept"><p>${user.department[1]}</p></div>
                        <div class="dept f"><p>${user.department[2]}</p></div>
                    </div></td>
                    <td>${user.salary}</td>
                    <td>${user.startDate}</td>
                    <td>
                        <div class="action">
                            <button class="icon-btn" id="edit-btn"  onclick="editemploy('${user.id}')"><img src="../Assets/icons/create-black-18dp.svg"></button>
                            <button class="icon-btn"  id="btn_delete"   ><span  onclick="deletemploy('${user.id}')"><img src="../Assets/icons/delete-black-18dp.svg"></span></button>
                        </div>
                    </td>
                  </tr>
            `;

            userTableBody.append(userRow);
        });
    }
           
    fetchdetails(); 
    
    // $('#delete-btn').on('click',function(){
    //     console.log($(this).closest('tr'));
    //     $(this).closest('tr').remove();
    // })
   

    
    $(".searchbtn").click(function(){
    $(this).replaceWith('<input type="text" id="searchInput" placeholder="Search users..." style="margin-left:500px"><button id="searchButt">Search</button>');
    $('#searchInput').on('keyup', function() {
        const searchTerm = $('#searchInput').val().toLowerCase();
        $.ajax({
            url: 'http://localhost:3000/Users',
            method: 'GET',
            contentType: 'application/json',
            success: function(data) {
                const filteredUsers = data.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                );
                displayUsers(filteredUsers);
            }
        });
    });
  });

  
});

function deletemploy(id){
    console.log("at the delete function")
    $.ajax({
        url: 'http://localhost:3000/Users/'+id,
        type: 'DELETE',
        success: function (res) {
            console.log(res);
            alert('Data deleted successfully');
            window.opener.location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
   };

  
function editemploy(id){
    console.log("at edit functon");
    $.ajax({
        url:'http://localhost:3000/Users/'+id,
        type:'GET',
        success:function(res){
            localStorage.setItem('editUser',JSON.stringify(res));
            console.log(res);
            window.location.replace("payrollform.html");
             
        },
        error:function(err){
            console.log(err);
        }

    })  
   
}




