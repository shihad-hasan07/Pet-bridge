import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './tabStyle.css'
import Pet from './pet';

const PetCategory = () => {
    const pettt = [
        {
            "_id": 1,
            "category": 'Cat',
            "image": "/cat.jpg",
            "name": 'honey bondey',
            "age": 14,
            "location": "rangpur"
        },
        {
            "_id": 2,
            "category": 'Cat',
            "image": "",
            "name": ' bondey',
            "age": 2,
            "location": "pirgonj"
        },
        {
            "_id": 3,
            "category": 'Cat',
            "image": "/cat.jpg",
            "name": 'cattu',
            "age": 2,
            "location": "kuttapara"
        },
        {
            "_id": 4,
            "category": 'Cat',
            "image": "/public/rabbit.jpg",
            "name": 'd o g saheb',
            "age": 2,
            "location": "kuttapara"
        },
        {
            "_id": 5,
            "category": 'Dog',
            "image": "/horse.jpg",
            "name": 'd o g saheb',
            "age": 2,
            "location": "kuttapara"
        },
    ]

    const cat = pettt.filter(pet => pet.category === "Cat").slice(0, 4)
    const dog = pettt.filter(pet => pet.category === "Dog").slice(0, 4)
    const Rabbit = pettt.filter(pet => pet.category === "Rabbit").slice(0, 4)
    const Horse = pettt.filter(pet => pet.category === "Horse").slice(0, 4)
    const Fish = pettt.filter(pet => pet.category === "Fish").slice(0, 4)

    return (
        <div className="custom-tabs pt-10">
            <Tabs>
                <TabList className="custom-tab-list grid grid-cols-2 md:grid-cols-5 gap-3 mb-10 mx-auto">
                    <Tab className="custom-tab" selectedClassName="custom-tab--active">Cat</Tab>
                    <Tab className="custom-tab" selectedClassName="custom-tab--active">Dog</Tab>
                    <Tab className="custom-tab" selectedClassName="custom-tab--active">Rabbit</Tab>
                    <Tab className="custom-tab" selectedClassName="custom-tab--active">Horse</Tab>
                    <Tab className="custom-tab" selectedClassName="custom-tab--active">Fish</Tab>
                </TabList>

                <TabPanel>
                    <div className=' grid md:grid-cols-2 lg:grid-cols-4 border-2 gap-6 container mx-auto'>
                        {
                            cat.length > 0
                                ? cat.map(details => <Pet key={details.name} details={details}></Pet>)
                                : <p>Empty</p>
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className=' grid md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto'>
                        {
                            dog.length > 0
                                ? dog.map(details => <Pet key={details.name} details={details}></Pet>)
                                : <p>Empty</p>
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto'>
                        {
                            Rabbit.length > 0
                                ? Rabbit.map(details => <Pet key={details.name} details={details}></Pet>)
                                : <p>Empty</p>
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className=' grid md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto'>
                        {
                            Horse.length > 0
                                ? Fish.map(details => <Pet key={details.name} details={details}></Pet>)
                                : <p>Empty</p>
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className=' grid md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto'>
                        {
                            Fish.length > 0
                                ? Fish.map(details => <Pet key={details.name} details={details}></Pet>)
                                : <p>Empty</p>
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default PetCategory;