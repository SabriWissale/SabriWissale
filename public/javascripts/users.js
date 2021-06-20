const users = document.querySelector("#users");
const pagination = document.querySelector("#pagination");

let paginationState = {
  offset: 0,
  limit: 5,
  page: 1,
  count: 0,
};
const navigate = async (e = null, offset = 0, limit = 5) => {
  
  if (e) {
   
    if (e.target.attributes.direction.value === "prev") {
      paginationState.offset -= 5;
      paginationState.page--;
    }
    
    else if (e.target.attributes.direction.value === "next") {
      paginationState.offset += 5;
      paginationState.page++;
    }
   
    else {
      paginationState.offset = offset;
      paginationState.limit = limit;
      paginationState.page = e.target.innerText;
    }
  }

  users.innerHTML = "";
  await fetch(
    `http://localhost:3000/users?offset=${paginationState.offset}&limit=${paginationState.limit}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.map((user) => {
        users.innerHTML += `
        <tr>
            <th scope="row">${user.username}</th>
            <td>${user.password}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td class="text-right">
              <a class="btn btn-secondary" onclick="updateUser(event, ${user.id}, '${user.username}', '${user.email}')"><i class="fa fa-edit"></i>Edit</a>
              <a class="btn btn-danger" onclick="deleteUser(event, ${user.id})"><i class="fa fa-trash"></i> Delete</a>
            </td>
        </tr>`;
      });
    });

  buildPagination(paginationState.page);
};

const buildPagination = async (page = 1, offset = 0, limit = 5) => {
 
  pagination.innerHTML = "";

  
  pagination.innerHTML += `
  <li ${
    paginationState.offset - 5 < 0
      ? 'class="page-item disabled"'
      : 'class="page-item"'
  }>
        <a class="page-link " href="#" onclick="navigate(event)" direction="prev" style="background-color: #df1e95; color : black">Previous</a>
    </li>`;
  await fetch(`http://localhost:3000/users`)
    .then((response) => response.json())
    .then((data) => {
      paginationState.count = data.length;
      data.slice(offset, Math.round(data.length / 5)).map((user, i) => {
      
        pagination.innerHTML += `
        <li  ${page == i + 1 ? 'class="page-item active"' : 'class="page-item"'}>
            <a style="color: #8B008B;" class="page-link" href="#" onclick="navigate(event, ${offset},${limit})" direction="page">${
          i + 1
        }</a>
        </li>`;
        offset += 5;
      });

    });
  
  pagination.innerHTML += `
      <li ${
        paginationState.offset + 5 < paginationState.count
          ? 'class="page-item"'
          : 'class="page-item disabled"'
      }>
          <a class="page-link" href="#" onclick="navigate(event)" direction="next" style="background-color: #df1e95; color : black">Next</a>
      </li>`;
};


const addUser = async (event) => {
  Swal.fire({
    html: `<form  method="post" onsubmit="addUser(event)">
      <tr>
        <td>Username:</td>
        <td><input  id="username" type="text" class="form-control"></td>
      </tr>
      <tr>
        <td>Email:</td>
        <td><input  id="email" type="email" class="form-control"></td>
      </tr>
      <tr>
        <td>Password:</td>
        <td><input  id="password" type="password" class="form-control"></td>
      </tr>
      <tr>
        <td>Role:</td>
        <td>
          <select id="role" class="form-control">
            <option value="admin">admin</option>
            <option selected value="author">author</option>
            <option value="guest">guest</option>
          </select>
        </td>
      </tr>
    </form>
  </div>`,
    confirmButtonText: "Add User",
    focusConfirm: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({
          username: Swal.getPopup().querySelector("#username").value,
          email: Swal.getPopup().querySelector("#email").value,
          password: Swal.getPopup().querySelector("#password").value,
          role: Swal.getPopup().querySelector("#role").value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: data.error,
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Success",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        });
    }
  });
};

const updateUser = async (event, id, username, email) => {
  Swal.fire({
    html: `<form  method="post" onsubmit="addUser(event)">
      <tr>
        <td>Username:</td>
        <td><input value=${username} id="username" type="text" class="form-control"></td>
      </tr>
      <tr>
        <td>Password:</td>
        <td><input id="password" type="password" class="form-control"></td>
      </tr>
      <tr>
      <td>Email:</td>
      <td><input value=${email} id="email" type="email" class="form-control"></td>
    </tr>
      <tr>
        <td>Role:</td>
        <td>
          <select id="role" class="form-control">
            <option value="admin">admin</option>
            <option selected value="author">author</option>
            <option value="guest">guest</option>
          </select>
        </td>
      </tr>
    </form>
  </div>`,
    confirmButtonText: "update this user",
    confirmButtonColor: "#8B0000",
    cancelButtonText: "No, cancel!",
    cancelButtonColor: "#A9A9A9",
    showCancelButton: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          username: Swal.getPopup().querySelector("#username").value,
          email: Swal.getPopup().querySelector("#email").value,
          password: Swal.getPopup().querySelector("#password").value,
          role: Swal.getPopup().querySelector("#role").value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: data.error,
              icon: "error",
              confirmButtonText: "close",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "Record edited successfuly",
              icon: "success",
              confirmButtonText: "close",
              confirmButtonColor: "#32CD32",
            });
          }
        });
    }
  });
};

const deleteUser = async (event, userId) => {
  event.preventDefault();
  Swal.fire({
    title: "do you really want to delete this record?",
    showDenyButton: true,
    confirmButtonText: `Yes. Delete`,
    confirmButtonColor: "#8B0000",
    denyButtonText: `No. Cancel`,
    denyButtonColor: "#A9A9A9",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            Swal.fire({
              title: "Error!",
              text: data.error,
              icon: "error",
              confirmButtonText: "close",
            });
          } else {
            Swal.fire({
              title: "Success!",
              text: "record deleted successfully",
              icon: "success",
              confirmButtonText: "close",
              confirmButtonColor: "#32CD32",
            });
          }
        });
    }
  });
};


buildPagination();
navigate();
