export async function facebookLogin(code: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/auth/login/facebook`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({code}),
    });
    const result = await res.json();
    if (res.status === 200) {
        localStorage.setItem("token", result.token);
        return result;
    } else {
        return false;
    }
}
