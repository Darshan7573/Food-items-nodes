import '@xyflow/react/dist/style.css';
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { useCallback, useState } from 'react';
import axios from 'axios';

const Flow = () => {
    const [nodes, setNodes] = useState([
        {
            id: 'explorer',
            data: { label: 'Explorer' },
            position: { x: 250, y: 25 }
        }
    ]);
    const [edges, setEdges] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null);
    const [categoryPositionY, setCategoryPositionY] = useState(100);
    const [dishPositionY, setDishPositionY] = useState(100);
    const [activeCategory, setActiveCategory] = useState(null);
    const [categoriesVisible, setCategoriesVisible] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
            const categories = res.data.categories.slice(0, 5);

            const newNodes = categories.map((category, index) => ({
                id: category.idCategory,
                data: { label: category.strCategory },
                position: { x: 250, y: categoryPositionY + index * 100 }
            }));

            const newEdges = categories.map((category) => ({
                id: `e-${category.idCategory}`,
                source: 'explorer',
                target: category.idCategory,
            }));

            setNodes((prevNodes) => [...prevNodes, ...newNodes]);
            setEdges(newEdges);
            setCategoriesVisible(true);
        } catch (error) {
            console.log('Error fetching the categories', error);
        }
    };

    const handleNodeClick = async (event, node) => {
        if (node.id === 'explorer') {
            if (!categoriesVisible) {
                fetchCategories();
            }
            return;
        }

        if (node.data.label && !dishes.some(dish => dish.idMeal === node.id)) {
            if (activeCategory && activeCategory !== node.id) {
                const filteredNodes = nodes.filter((n) => !dishes.some(dish => dish.idMeal === n.id));
                const filteredEdges = edges.filter((edge) => edge.source !== activeCategory);

                setNodes(filteredNodes);
                setEdges(filteredEdges);
                setDishes([]);
            }

            try {
                const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${node.data.label}`);
                const newDishes = res.data.meals.slice(0, 5);

                const dishNodes = newDishes.map((dish, index) => ({
                    id: dish.idMeal,
                    data: { label: dish.strMeal },
                    position: { x: 500, y: dishPositionY + index * 100 }
                }));

                const newEdges = newDishes.map((dish) => ({
                    id: `e-${dish.idMeal}`,
                    source: node.id,
                    target: dish.idMeal,
                }));

                setDishes(newDishes);
                setEdges((prevEdges) => [...prevEdges, ...newEdges]);
                setNodes((prevNodes) => [...prevNodes, ...dishNodes]);
                setActiveCategory(node.id);
            } catch (error) {
                console.log('Error fetching the dishes', error);
            }
        }

        if (dishes.some(dish => dish.idMeal === node.id)) {
            handleDishClick(event, node);
        }
    };

    const handleDishClick = async (event, node) => {
        try {
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${node.id}`);
            const dishDetails = res.data.meals[0];
            setSelectedDish(dishDetails);
        } catch (error) {
            console.log('Error fetching dish details', error);
        }
    };

    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => {
            setEdges((eds) => applyEdgeChanges(changes, eds));
        },
        [setEdges]
    );
    return (
        <div className="w-full h-screen flex border-gray-300"> {/* Apply flex here */}
            <div className="w-3/4 h-full">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={handleNodeClick}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                >

                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
            {selectedDish && (
                <div className="dish-details w-1/4 p-4 border-l border-gray-300"> {/* Fixed width for dish details */}
                    <h2 className="text-xl font-bold mb-4">{selectedDish.strMeal}</h2>
                    <div className="flex justify-center">
                        <img
                            src={selectedDish.strMealThumb}
                            alt={selectedDish.strMeal}
                            className="w-[200px] h-auto rounded-lg"
                        />
                    </div>
                    <p className="mt-4">{selectedDish.strInstructions}</p>
                </div>
            )}
        </div>
    );
};

export default Flow;
