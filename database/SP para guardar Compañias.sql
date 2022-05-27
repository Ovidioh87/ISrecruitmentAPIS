CREATE DEFINER=`root`@`localhost` PROCEDURE `companyAddEdit`(
	IN _id varchar(50),
    IN _name varchar(100),
    IN _address varchar(100),
    IN _country varchar(100),
    IN _phone varchar(20),
    IN _mail varchar(45)
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO REC_COMPANY (idCompany, nameCompany, addressCompany, countryCompany, phoneCompany, mailCompany) 
        VALUES (_id, _name, _address, _country, _phone, _mail);
	ELSE
		UPDATE REC_COMPANY
        SET 
			nameCompany = _name,
			addressCompany = _address,
            countryCompany = _country,
            phoneCompany = _phone,
            mailCompany = _mail
			WHERE idCompany = _id;
	END IF;
    SELECT _id AS idCompany;
END