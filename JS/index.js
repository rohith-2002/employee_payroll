// function save(){
//     let name=
//     console.log("Data Saved");
// }

$(function(e){
    getEmployeeList();
    // alert("Jquery loaded");
     $("#btnSubmit").on('click',function(e){
        let name=$("#txtName").val();
        alert(name);
    })
})

function getEmployeeList(){
    $.ajax({
        url:"http://localhost:3000/Employee",
        type:"GET",
        success:function(res){
            console.log(res);
            for(var i=0;i<res.length;i++){
                var data=
                `<tr>
                <td>${res[i].name}</td>
                <td>${res[i].gender}</td>
                <td>${res[i].departnment} </td>
                <td>${res[i].salary} </td>
                </tr>`
                $("#tablebody").append(data);
                
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}