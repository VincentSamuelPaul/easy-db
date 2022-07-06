export const login = async(id, name, password) => {
    if (!localStorage.getItem('userCred')) {
        localStorage.setItem('userCred', JSON.stringify({ id: id, name: name, password: password }));
    }
}

// export const register = async(e, id, name, password) => {
//     e.preventDefault();
//     if ()
// }

export const logout = async(id) => {
    localStorage.removeItem('userCred');
    console.log('done');
}