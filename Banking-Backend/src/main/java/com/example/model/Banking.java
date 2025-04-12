package com.example.model;

import java.util.ArrayList;
import java.util.List;

import com.example.facility.Facility;
import com.example.gender.Gender;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="Banking")
public class Banking {
	@Id
	@NotNull(message="User name is required")
	String Username;
	@NotNull(message="Email is required")
	@Email(message="Provide a valid Email")
	String email;
	Gender gender;
	@NotNull(message="Location is required")
	String location;
	@NotNull(message="Nationality is required")
	String nationality;
	@NotNull(message="Account no is Required")
	String AccountNo;
	@NotNull(message="CIF No is required")
	@Pattern(regexp="\\d{11}",message="CIF No Should be 11 digits")
	long CifNo;
	@NotNull(message="Branch Code is required")
	@Pattern(regexp="\\d{4,6}",message="Branch code should be between 4-6 digits")
	int BranchCode;
	Facility facility;
	@NotNull(message="Password is required")
	@Size(min=8,message="Password should be greater than 8 characters")
	String Password;
	double balance=0;
	double loanval;
	double intrest;
	boolean isEmployee=false;
	String message;
	boolean isAdmin;
	boolean needLoan=false;
	boolean neededTransaction=false;
	boolean allowTrans=false;
	boolean allowLoan=false;
	float neededLoan;
	String loanType;
	boolean freeze=false;
	int LoanTime;
	boolean Tchecked=false;
	boolean Lchecked=false;
	@ElementCollection
    List<Double> transaction = new ArrayList<>();
	@ElementCollection
    private List<String> transactionHistory = new ArrayList<>();
	List<Double> TransPer= new ArrayList<>();
    public Banking() {
        this.transaction=new ArrayList<>();
        this.TransPer=new ArrayList<>();
        this.transactionHistory=new ArrayList<>();
    }
}