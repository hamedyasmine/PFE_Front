function UploadCV() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Gérer l'envoi du CV
    };

    return (
        <div className="container">
            <h2>Déposer votre CV</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" name="cv" />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
}

export default UploadCV; 
