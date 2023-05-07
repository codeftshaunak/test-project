import { useEffect, useState } from 'react';
import xml2js from 'xml2js';

const userData = [
    {
        name: 'Aryan',
        age: 35,
        hobbies: ['cricket', 'chess']
    },
    {
        name: 'Steve',
        age: 25,
        hobbies: ['reading', 'driving']
    },
    {
        name: 'Ron',
        age: 28,
        hobbies: []
    },
    {
        name: 'Tedd',
        age: 62,
        hobbies: ['running']
    }
];

const Table = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(userData)
    }, [userData])

    const convertToXml = () => {
        const builder = new xml2js.Builder();
        const xml = builder.buildObject({
            USERDATA: {
                USER: users.map((user) => {
                    return {
                        $: { name: user.name },
                        NAME: user.name,
                        AGE: user.age,
                        HOBBIES: user.hobbies.join(', ')
                    }
                })
            }
        });
        const element = document.createElement('a');
        const file = new Blob([xml], { type: 'text/xml' });
        element.href = URL.createObjectURL(file);
        element.download = 'users.xml';
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="text-center bg-color pl-5 pr-5 pb-5">
            <table className="table-auto w-full border-collapse border-bottom">
                <thead>
                    <tr className="bg-color text-color">
                        <th className="py-5 px-4">Name</th>
                        <th className="py-2 px-4">Age</th>
                        <th className="py-2 px-4">Hobbies</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="border-bottom text-color bg-white">
                            <td className="py-5 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.age}</td>
                            <td className="py-2 px-4">{user.hobbies.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="justify-end mr-5">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={convertToXml}
                >
                    Convert
                </button>
            </div>
        </div>
    );
};

export default Table;
