-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2023 at 12:16 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(3, 59),
(3, 60),
(3, 62),
(3, 63),
(3, 64),
(3, 65),
(3, 66),
(3, 77),
(3, 81),
(3, 84),
(15, 59),
(15, 64),
(15, 66),
(15, 67),
(15, 69),
(15, 71),
(15, 72),
(15, 75),
(16, 59),
(16, 61),
(16, 66),
(16, 69),
(16, 71),
(16, 73),
(17, 59),
(17, 61),
(17, 69),
(17, 71),
(17, 73),
(17, 75),
(18, 59),
(18, 63),
(18, 70),
(18, 71),
(18, 73),
(19, 59),
(19, 64),
(19, 67),
(19, 73),
(19, 74),
(19, 75);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Lior', 'Stru', 'lior@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'Admin'),
(3, 'tzlil', 'stru', 'tzlil@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(15, 'Homer', 'Simpson', 'homer@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(16, 'Lisa', 'Simpson', 'lisa@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(17, 'Bart', 'Simpson', 'bart@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(18, 'Marge', 'simpson', 'marge@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User'),
(19, 'Spider', 'Man', 'spiderman@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(59, 'Bali', 'Experience the paradise on earth with this exotic vacation in Bali, Indonesia. From the crystal-clear waters of the Indian Ocean to the lush green jungles, Bali is a land of natural beauty and cultural richness. Enjoy the world-famous Balinese hospitality, learn about the unique traditions and customs, and indulge in the mouth-watering local cuisine. Whether you\'re looking for adventure, relaxation, or a spiritual journey, Bali has it all.', '2023-02-25', '2023-03-07', '1800.00', '78ef37d2-6b98-4b2f-91c9-bbe12f8da5ad.jpg'),
(60, 'Tuscany', 'Unwind in the heart of Italy with a luxurious vacation in Tuscany. Famous for its rolling hills, picturesque landscapes, and historic towns, Tuscany is a dream destination for art lovers, foodies, and wine connoisseurs. Take a stroll through the charming streets of Florence, visit the iconic Leaning Tower of Pisa, or savor the flavors of Chianti\'s world-renowned wines. With its rich history, vibrant culture, and stunning scenery, Tuscany is a must-see destination for any traveler.', '2023-02-27', '2023-03-10', '2200.00', '64123f4a-1b09-42af-8059-7b162ec1baf5.jpg'),
(61, ' Santorini', 'Escape to the idyllic island of Santorini, Greece, for a vacation filled with sun, sea, and serenity. Known for its whitewashed buildings, stunning cliffs, and breathtaking sunsets, Santorini is the epitome of Mediterranean beauty. Immerse yourself in the Greek lifestyle, sample the delicious local cuisine, and explore the ancient ruins of Akrotiri. Whether you\'re looking to relax on the beach or soak up the culture, Santorini is the perfect destination.', '2023-03-08', '2023-03-16', '1650.00', '16f2aa40-db16-420c-8bbc-40c78a66cfab.jpg'),
(62, 'Cape Town', 'Embark on an adventure to Cape Town, South Africa, for a vacation that combines stunning natural scenery with rich cultural heritage. From the iconic Table Mountain to the vibrant Bo-Kaap neighborhood, Cape Town is a city of contrasts and beauty. Explore the historic Robben Island, sample the delicious Cape Malay cuisine, or take a safari tour to see the Big Five in their natural habitat. With its diverse culture, breathtaking landscapes, and welcoming people, Cape Town is a destination that will leave you speechless.', '2023-02-28', '2023-03-10', '2600.00', '30bd54a9-0c44-4748-be4d-5c2819c4c46f.jpg'),
(63, 'Marrakesh', 'Marrakesh is a vibrant city that\'s steeped in history and culture. It\'s known for its colorful markets, ancient palaces, and stunning mosques. You can wander through the souks, indulge in Moroccan tea, and experience the local culture. Marrakesh is a great place to explore and immerse yourself in the history and traditions of Morocco.', '2023-03-03', '2023-03-30', '3200.00', 'cc3d74a2-3096-41ab-8196-a35030ed8d63.jpg'),
(64, 'Rio de Janeiro', 'city that\'s known for its vibrant culture, stunning beaches, and lively nightlife. Take a cable car ride up to the top of Sugarloaf Mountain, stroll along the famous Copacabana Beach, or visit the Christ the Redeemer statue. Rio de Janeiro is a great place to experience the energy and excitement of Brazil.', '2023-02-28', '2023-03-09', '2200.00', '5c747643-4ae8-442b-bbd5-677e30adced4.jpg'),
(65, 'Phuket', 'tropical paradise that boasts pristine beaches, crystal-clear waters, and a vibrant nightlife. You can relax on the beach, explore the local markets, or visit the Big Buddha statue. Phuket is a great place to unwind and soak up the sun.', '2023-03-30', '2023-04-07', '890.00', 'bb8d8ee2-623b-4962-8763-7f63827bd48b.jpg'),
(66, 'Vancouver', 'vibrant city that\'s surrounded by stunning natural beauty. You can explore Stanley Park, visit the Granville Island Public Market, or take a stroll through the colorful neighborhoods of Chinatown and Gastown. Vancouver is a perfect destination for outdoor enthusiasts and city lovers alike.', '2023-04-20', '2023-04-25', '3400.00', '8274ec72-298b-4a2f-876b-d7a60933d54a.jpg'),
(67, 'Tel aviv', 'Tel Aviv is a vibrant and bustling city located on the Mediterranean coast of Israel. It\'s known for its stunning beaches, thriving nightlife, and rich cultural scene. Visitors can explore the winding streets of the historic Jaffa neighborhood, take in the breathtaking views from the top of the Azrieli Tower, or simply relax on the beach and soak up the sun. With its unique blend of Middle Eastern and Mediterranean influences, Tel Aviv is a must-visit destination for any traveler.', '2023-04-28', '2023-05-03', '1850.00', '47f76bc5-9136-44bc-a6c8-1180d54e2453.jpg'),
(68, 'New-York', 'New York City is one of the world\'s most iconic and exciting destinations. Known as the \"City That Never Sleeps,\" New York is a bustling metropolis filled with towering skyscrapers, world-class museums, and an endless array of restaurants, shops, and entertainment venues. From the bright lights of Times Square to the tranquil beauty of Central Park, there\'s always something new to discover in New York.', '2023-05-30', '2023-06-07', '2000.00', 'f31a347c-bd1f-41e9-bb35-22765cf06afa.jpg'),
(69, 'Miami', 'Miami is a vibrant and diverse city located on the southeastern coast of Florida. It\'s known for its stunning beaches, world-famous nightlife, and rich cultural scene. Visitors can explore the colorful streets of Little Havana, take a sunset cruise on Biscayne Bay, or simply soak up the sun on the white sandy beaches of South Beach. With its year-round warm weather and laid-back vibe, Miami is a perfect destination for a relaxing getaway.', '2023-03-04', '2023-04-07', '1760.00', 'f10b92d3-6824-4b30-84bc-4fb5c6fa4ba8.jpg'),
(70, 'Madrid', 'Madrid is the bustling capital city of Spain and is known for its rich history, stunning architecture, and world-class museums. Visitors can explore the winding streets of the old town, marvel at the stunning Royal Palace, or take in a game of soccer at the iconic Santiago Bernabeu Stadium. With its vibrant culture, delicious cuisine, and friendly locals, Madrid is a must-visit destination for any traveler.', '2023-04-27', '2023-04-28', '980.00', '7a07fa08-d36a-44a8-8caa-ce6c1fb45cf3.jpg'),
(71, 'Viena', 'Vienna is the historic capital city of Austria and is known for its stunning architecture, rich cultural scene, and world-class museums. Visitors can explore the majestic Hofburg Palace, take in a performance at the iconic Vienna State Opera, or simply stroll through the city\'s beautiful parks and gardens. With its rich history, stunning architecture, and vibrant cultural scene, Vienna is a perfect destination for any traveler.', '2023-06-22', '2023-06-29', '1450.00', '1191d197-21d6-4a94-b088-1c67d9504a2c.jpg'),
(72, 'Sydeny', 'Sydney is a vibrant and exciting city located on the southeastern coast of Australia. It\'s known for its stunning beaches, iconic landmarks, and world-class cultural scene. Visitors can explore the iconic Sydney Opera House, climb to the top of the Sydney Harbour Bridge, or simply relax on the beautiful sandy beaches of Bondi and Coogee. With its laid-back lifestyle, beautiful scenery, and friendly locals, Sydney is a perfect destination for a relaxing getaway.', '2023-05-31', '2023-06-10', '3200.00', 'aa9bf416-b037-49db-8bad-fe8b33ad39ec.jpg'),
(73, 'Bankok', 'Bangkok is a bustling metropolis located in the heart of Thailand. It\'s known for its vibrant street life, stunning temples, and world-class cuisine. Visitors can explore the colorful street markets of Chatuchak and Chinatown, marvel at the stunning temples of Wat Phra Kaew and Wat Arun, or simply indulge in some of the best street food in the world. With its vibrant culture, friendly locals, and stunning scenery, Bangkok is a must-visit destination for any traveler.', '2023-03-04', '2023-03-28', '2350.00', 'f831dc96-1008-4475-9578-d3b57a987324.jpg'),
(74, 'Dubai', 'Dubai is a modern and cosmopolitan city located in the United Arab Emirates. It\'s known for its stunning architecture, world-class shopping, and luxurious resorts. Visitors can explore the iconic Burj Khalifa, take a sunset camel ride in the desert', '2023-05-29', '2023-06-08', '1200.00', 'd6b31cc4-8e04-4f68-b922-a23bc8675eb0.jpg'),
(75, 'Paris', 'Known as the \"City of Light,\" Paris is one of the most romantic and charming cities in the world. From the Eiffel Tower to the Louvre Museum, Paris is home to some of the most iconic landmarks and cultural institutions on the planet. Visitors can stroll along the Seine River, savor authentic French cuisine or shop at trendy boutiques.', '2023-02-28', '2023-03-10', '1400.00', '722bfa30-6d11-4fde-9621-3e6f43dddd9a.jpg'),
(76, 'Amsterdam', 'Known for its picturesque canals, vibrant nightlife and historic architecture, Amsterdam is a city that has something for everyone. Visitors can enjoy a bike ride through the city\'s charming streets, visit one of the city\'s many museums or simply relax and enjoy a delicious meal at one of its many cafes.', '2023-03-02', '2023-03-25', '1000.00', '22029c52-f4ac-4722-8590-8533d75afdae.jpg'),
(77, 'London', 'London: With its rich history, world-class museums and vibrant culture, London is one of the most exciting and diverse cities in the world. Visitors can explore iconic landmarks, such as the Tower of London and Buckingham Palace, or simply enjoy a leisurely stroll through one of the city\'s many parks.', '2023-03-02', '2023-03-30', '1960.00', 'c6ea0d68-d456-47cc-b5c4-d8a3ef9652e0.jpg'),
(79, 'Machu', ' Journey to the top of the world and explore the ancient Incan city of Machu Picchu. Hike through rugged mountain terrain, marvel at breathtaking views, and discover the rich history of one of the world\'s most fascinating civilizations.', '2023-03-08', '2023-03-09', '2370.00', '22063533-6d54-4072-9b01-02fd579ad868.jpg'),
(80, 'Cancun', 'Relax and recharge in this stunning coastal paradise, where white sand beaches and turquoise waters await. Indulge in all-inclusive luxury resorts, sip margaritas by the pool, and soak up the sun in style.', '2023-02-28', '2023-03-04', '1840.00', '70779024-407b-473f-adee-b0fafed95bbb.jpg'),
(81, 'Iceland', 'Iceland, known as the Land of Fire and Ice, is a Nordic island country located between the North Atlantic and the Arctic Ocean. It is a unique destination for nature lovers and adventure seekers. The country is known for its stunning natural landscapes, including glaciers, volcanoes, hot springs, geysers, and waterfalls. Iceland is also home to many unique animal species, such as puffins, Arctic foxes, and reindeer. Visitors can enjoy a range of activities, from hiking and camping to skiing and snowboarding. The country\'s capital, Reykjavik, is a vibrant city with a rich cultural scene and exciting nightlife.', '2023-02-27', '2023-03-10', '4200.00', '300e2f15-e8a8-4c2c-a5db-c3cd4c7d7253.jpg'),
(83, 'Eilat', 'fjfjfjfjfjsdjs', '2023-03-08', '2023-03-28', '1234.00', '0abc7838-043e-4751-ae3b-4e3104bf16ff.jpg'),
(84, 'Dallas', 'sdvsvwsv', '2023-02-10', '2023-03-09', '2222.00', '575ecc97-38a4-4850-8412-1946a5c7a5e9.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
