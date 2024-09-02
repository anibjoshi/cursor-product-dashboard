import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal}>Upload CSV</button>
            {isModalOpen && <FileUpload onClose={closeModal} />}
        </div>
    );
}