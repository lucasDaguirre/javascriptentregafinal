const getSearchData = () =>{
    let data = JSON.parse(localStorage.getItem('input-data'));
    return data
}
getSearchData()

const getAdults = () => {
    let data = JSON.parse(localStorage.getItem('input-data'));
    const adults = data["input-adults"];
    return adults;
}
getAdults();

const buildList = () => {
    const passenger = JSON.parse(localStorage.getItem('pas-1'));
    document.querySelector('.pas-seat-name').innerHTML = `${passenger["pas-nam"]} ${passenger["pas-sur"]}`;
    for (let i = 1; i < getAdults(); i++){
        const pas = JSON.parse(localStorage.getItem(`pas-${i+1}`));
        const parent = document.getElementById('pas-seat-1');
        const cloned = parent.cloneNode(true);
        const newPas = document.createElement('div');
        Array.from(cloned.children).forEach(node => {
            let clone = node.cloneNode(true);
            newPas.appendChild(clone);
            newPas.id = `pas-seat-${i+1}`
            newPas.querySelector('.pas-seat-name').innerHTML = `${pas["pas-nam"]} ${pas["pas-sur"]}`;
            newPas.classList.add('pas-list-row');
            document.getElementById('comp-seat-list').appendChild(newPas)
        })
    }
}
buildList();