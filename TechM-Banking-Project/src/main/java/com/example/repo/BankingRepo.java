package com.example.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Banking;


public interface BankingRepo extends JpaRepository<Banking,String>{
	

}
