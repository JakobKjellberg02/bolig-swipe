export async function fetchBolig(APIURL) {
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching a Bolig: ', error);
        return null;
    }
}
