export async function GetTest() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/test',
            {
                method: 'GET',    
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}