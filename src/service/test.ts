export async function GetTest() {
    try {
        const response = await fetch('https://test-web-v3-rho.vercel.app/api/v1/test',
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