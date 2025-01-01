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
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
        throw new Error(errorMessage);
    }
}