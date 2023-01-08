export const getResultsFromLocalStorage = () => {
    const results = window.localStorage.getItem('results');
    return results ? JSON.parse(results) : null;
}
  
export const saveResultToLocalStorage = (results) => {
    window.localStorage.setItem('results', JSON.stringify(results));
}