document.getElementById('fitnessForm').addEventListener('submit', async function(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // https://basbas778.github.io/
    const response = await fetch('https://YOUR_PROJECT_NAME.vercel.app/api/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById('output').innerText = result.text;
});
