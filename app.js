document.getElementById('fitnessForm').addEventListener('submit', async function(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // ส่งข้อมูลไป backend ของเรา
    const response = await fetch('https://YOUR_SERVER_FUNCTION_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById('output').innerText = result.text;
});
