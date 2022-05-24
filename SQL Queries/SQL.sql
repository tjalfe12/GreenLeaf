DELIMITER $$
CREATE DEFINER=`sabox_dk`@`%` PROCEDURE `AddPost`(IN `descriptionVar` TEXT, IN `expiration_dateVar` DATE, IN `category_idVar` INT, IN `post_titleVar` VARCHAR(100), IN `user_idVar` INT, IN `postImg_urlVar` MEDIUMBLOB)
BEGIN

START TRANSACTION;

INSERT INTO Entries
(post_title, post_description, category_id, expiration_date, user_id, postImg_url, creation_date)
VALUES
(post_titleVar, descriptionVar, category_idVar, expiration_dateVar, user_idVar, postImg_urlVar, NOW())
;

INSERT INTO Activities
(description, activity_time)
VALUES
("Post created", NOW())
;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`sabox_dk`@`%` PROCEDURE `AddUser`(IN `firstNameVar` VARCHAR(100), IN `lastNameVar` VARCHAR(100), IN `emailVar` VARCHAR(100), IN `passwordVar` VARCHAR(500), IN `is_businessVar` BOOLEAN, IN `img_urlVar` VARCHAR(100))
BEGIN

START TRANSACTION;
IF NOT EXISTS(SELECT user_id FROM Users WHERE email=emailVar)
THEN
INSERT INTO Users
(first_name, last_name, email, pass, is_business, creation_date, img_url)
VALUES
(firstNameVar, lastNameVar, emailVar,passwordVar, is_businessVar, NOW(), img_urlVar)
;

INSERT INTO Activities
(description, activity_time)
VALUES
("User added", NOW())
;
ELSE
ROLLBACK;
SELECT 'User already exists!' ErrorMessage;
END IF;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`sabox_dk`@`%` PROCEDURE `UpdateUser`(IN `first_nameVar` VARCHAR(100), IN `last_nameVar` VARCHAR(100), IN `emailVar` VARCHAR(100), IN `is_businessVar` BOOLEAN, IN `passVar` VARCHAR(100), IN `user_idVar` INT)
BEGIN

START TRANSACTION;

UPDATE Users
SET
first_name = first_nameVar, 
last_name = last_nameVar, 
email = emailVar, 
is_business = is_businessVar,
pass = passVar
WHERE user_id = user_idVar
;

INSERT INTO Activities
(description, activity_time)
VALUES
("User updated", NOW())
;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`sabox_dk`@`%` PROCEDURE `DeletePost`(IN `post_idVar` INT)
BEGIN

START TRANSACTION;

DELETE FROM Entries
WHERE post_id = post_idVar;

INSERT INTO Activities
(description, activity_time)
VALUES
("Post deleted", NOW())
;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`sabox_dk`@`%` PROCEDURE `UpdatePost`(IN `post_titleVar` VARCHAR(100), IN `post_descriptionVar` TEXT, IN `category_idVar` INT, IN `expiration_dateVar` DATETIME, IN `post_idVar` INT, IN `postImg_urlVar` VARCHAR(100))
BEGIN

START TRANSACTION;

UPDATE Entries
SET
post_title = post_titleVar, 
post_description = post_descriptionVar, 
category_id = category_idVar, 
expiration_date = expiration_dateVar,
updated_on = NOW(),
postImg_url = postImg_urlVar
WHERE post_id = post_idVar
;

INSERT INTO Activities
(description, activity_time)
VALUES
("Post updated", NOW())
;
COMMIT;
END$$
DELIMITER ;

