
export async function Signup(name: string, email: string, password: string) {
    const body = JSON.stringify({ name, email, password });
    const res = await fetch('http://localhost:3000/api/v1/auth/signup', 
      {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: body,
      }
    );
    const data = await res.json(); 
    if (!res.ok) {
        throw new Error(data.message || "An error occurred");
    }
    console.log(data)
    return data;
}

export async function LoginAPI(email: string, password: string) {
    const body = JSON.stringify({ email, password });
    try {
        const res = await fetch('http://localhost:3000/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
        const data = await res.json();
        if(!data.success){
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra";
        throw new Error(errorMessage);
    }
}