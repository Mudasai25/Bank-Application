package com.example.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

import com.example.exception.BankingException;
import com.example.model.Banking;
//import com.example.model.Loan;
import com.example.repo.BankingRepo;
import com.example.service.BankingService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/banking")  
public class BankingController {
	@Autowired
	private BankingRepo repo;
	@Autowired
	private BankingService s;
	public BankingController(BankingRepo repo) {
        this.repo = repo;
    }
	/*@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Banking b) {
		return ResponseEntity.ok().body(Map.of("success", true, "message",s.register(b)));
	}*/
	@GetMapping("/users")
	public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
	    List<Banking> users = repo.findAll();
	    List<Map<String, Object>> response = users.stream().map(user -> {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("username", user.getUsername());
            userMap.put("isAdmin", user.isAdmin());
            userMap.put("isEmployee", user.isEmployee());
            userMap.put("freeze", user.isFreeze());
            userMap.put("email", user.getEmail());
            userMap.put("balance", user.getBalance());
            userMap.put("amount", user.getNeededLoan());

            
            return (Map<String, Object>) userMap; 
        }).collect(Collectors.toList());
	    return ResponseEntity.ok(response);
	}


	
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Banking b) {
	    Banking savedUser = s.register(b);

	    if (savedUser != null) {
	        return ResponseEntity.ok().body(Map.of("success", true, "message", "User registered successfully"));
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
	            "error", "Registration failed! Username, Email, Account No, or Mobile already exists."
	        ));
	    }
	}


	/*@GetMapping("/login/{id}/{pass}")
	public Banking login(@PathVariable String id,@PathVariable String pass) {
		return s.login(id, pass);
	}*/
	/*@GetMapping("/login/{id}/{pass}")
	public ResponseEntity<?> login(@PathVariable String id, @PathVariable String pass) {
	    try {
	        Banking user = s.login(id, pass);
	        return ResponseEntity.ok().body(Map.of("success", true, "message", "✅ Login successful!", "user", user));
	    } catch (BankingException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", e.getMessage()));
	    }
	}*/
	@GetMapping("/login/{id}/{pass}")
	public ResponseEntity<?> login(@PathVariable String id, @PathVariable String pass) {
	    try {
	        Banking response = s.login(id, pass);
	        return ResponseEntity.ok(response);
	    } catch (BankingException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("success", false, "message", e.getMessage()));
	    }
	}

	@GetMapping("/login/{id}/{pass}/otp/{otp}")
    public ResponseEntity<Banking> checkOtp(@PathVariable String id, @PathVariable String pass,@PathVariable String otp){
    	return ResponseEntity.ok(s.checkOtp(s.login(id, pass), otp));
    }

	@GetMapping("/elogin/{id}/{pass}")
	public ResponseEntity<?> elogin(@PathVariable String id, @PathVariable String pass) {
	    try {
	        Banking user = s.elogin(id, pass);
	        return ResponseEntity.ok().body(Map.of("success", true, "message", "✅ Login successful!", "user", user));
	    } catch (BankingException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", e.getMessage()));
	    }
	}
	@GetMapping("/elogin/{id}/{pass}/otp/{otp}")
    public ResponseEntity<Banking> checkEmpOtp(@PathVariable String id, @PathVariable String pass,@PathVariable String otp){
    	return ResponseEntity.ok(s.checkOtp(s.elogin(id, pass), otp));
    }
	@GetMapping("/alogin/{id}/{pass}")
	public ResponseEntity<?> alogin(@PathVariable String id, @PathVariable String pass) {
	    try {
	        Banking user = s.alogin(id, pass);
	        return ResponseEntity.ok().body(Map.of("success", true, "message", "✅ Login successful!", "user", user));
	    } catch (BankingException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", e.getMessage()));
	    }
	}
	@GetMapping("/alogin/{id}/{pass}/otp/{otp}")
    public ResponseEntity<Banking> checAdmkOtp(@PathVariable String id, @PathVariable String pass,@PathVariable String otp){
    	return ResponseEntity.ok(s.checkOtp(s.alogin(id, pass), otp));
    }

	/*public ResponseEntity<?> alogin(@PathVariable String id, @PathVariable String pass) {
        try {
            Banking user = s.alogin(id, pass);
            return ResponseEntity.ok().body(Map.of("success", true, "message", "✅ Login successful!", "user", user));
        } catch (BankingException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "🚨 Internal Server Error!"));
        }
    }*/



	/*@GetMapping("/elogin/{id}/{pass}")
	public Banking elogin(@PathVariable String id,@PathVariable String pass) {
		return s.elogin(id, pass);
	}
	@GetMapping("/alogin/{id}/{pass}")
	public Banking alogin(@PathVariable String id,@PathVariable String pass) {
		return s.alogin(id, pass);
	}*/
	@PutMapping("/login/{id}/{pass}/deposit/{val}")
	public ResponseEntity<String> deposit(@PathVariable String id, @PathVariable String pass, @PathVariable double val) {
	    Banking user = s.login(id, pass); // Authenticate user
	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
	    }

	    String message = s.deposit(user, val);
	    return ResponseEntity.ok(message);
	}

	/*@PutMapping("/login/{id}/{pass}/deposit/{val}")
	public String deposit(@PathVariable String id,@PathVariable String pass,@PathVariable double val) {
		return s.deposit(s.login(id, pass), val);
	}*/
	@PutMapping("/login/{id}/{pass}/withdraw/{val}")
	public String withdraw(@PathVariable String id,@PathVariable String pass,@PathVariable double val) {
		return s.withdraw(s.login(id, pass), val);
	}
	
	@GetMapping("/{username}/{password}/balance")
	public ResponseEntity<Double> getBalance(@PathVariable String username, @PathVariable String password) {
	    Optional<Banking> user = repo.findById(username);
	    
	    if (user.isPresent() && user.get().getPassword().equals(password)) {
	        return ResponseEntity.ok(user.get().getBalance());
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0);
	    }
	}

	
	@GetMapping("/login/{id}/{pass}/balance")
	public double balance(@PathVariable String id,@PathVariable String pass) {
		return s.balance(s.login(id, pass));
	}
	@PutMapping("/login/{id}/{pass}/loan/{type}/{val}/{time}")
	public String loan(@PathVariable String id, @PathVariable String pass, 
	                   @PathVariable String type, @PathVariable float val, 
	                   @PathVariable int time) {
	    return s.loan(s.login(id, pass), type, val, time);
	}
	@GetMapping("/elogin/{id}/{pass}/details")
	public List<Banking> getAllDetails(@PathVariable String id,@PathVariable String pass) {
		return s.getAllDetails(s.elogin(id, pass));
	}
	@GetMapping("/elogin/{id}/{pass}/details/id1")
	public Optional<Banking> getAllDetails(@PathVariable String id,@PathVariable String pass,@PathVariable String id1) {
		return s.getDetails(s.elogin(id, pass), id1);
	}
	@GetMapping("/login/{id}/{pass}/details")
	public Banking getMyDetails(@PathVariable String id,@PathVariable String pass) {
		return s.login(id, pass);
	}
	@GetMapping("/login/transactions/{id}/{pass}")
    public Map<String, Object> getTransactionDetails(@PathVariable String id, @PathVariable String pass) {
        Banking user = s.login(id, pass);
        
        if (user != null) {
            List<Double> amounts = s.getTrans(user);
            List<String> messages = s.getTransactionMessages(user);
            
            // Combine amounts and messages in a response map
            Map<String, Object> response = new HashMap<>();
            response.put("amounts", amounts);
            response.put("messages", messages);
            
            return response;
        }
        return new HashMap<>(); 
    }
	@PutMapping("/login/{id}/{pass}/trans/{id1}/{val}")
	public ResponseEntity<String> transaction(
	        @PathVariable String id, 
	        @PathVariable String pass, 
	        @PathVariable String id1, 
	        @PathVariable double val) {
	    
	    try {
	    	String result = s.transaction(id, pass, id1, val);
	        return ResponseEntity.ok(result);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Transaction failed: " + e.getMessage());
	    }
	}





	/*@PutMapping("/login/{id}/{pass}/feedback/{message}")
	public String feedback(@PathVariable String id,@PathVariable String pass,@PathVariable String message) {
		return s.addFeed(s.login(id, pass), message);
	}*/
	
	@PutMapping("/login/{id}/{pass}/feedback/{message}")
	public ResponseEntity<String> feedback(
	    @PathVariable String id, 
	    @PathVariable String pass, 
	    @PathVariable String message) {

	    try {
	        String response = s.addFeed(s.login(id, pass), message);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to submit query: " + e.getMessage());
	    }
	}


	@GetMapping("/elogin/{id}/{pass}/getfeedbacks")
	public ResponseEntity<List<Map<String, String>>> getAllFeedbacks(@PathVariable String id, @PathVariable String pass) {
	    Banking bankingUser = s.login(id, pass);
	    if (bankingUser == null || !bankingUser.isEmployee()) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }

	    List<Banking> allUsers = s.getAllBankingUsers(); // Fetch all users from Banking
	    if (allUsers.isEmpty()) {
	        return ResponseEntity.noContent().build(); // Return 204 if no users exist
	    }

	    List<Map<String, String>> feedbackList = allUsers.stream()
	        .filter(user -> user.getMessage() != null && !user.getMessage().isEmpty()) // Filter users with messages
	        .map(user -> {
	            Map<String, String> feedback = new HashMap<>();
	            feedback.put("Username", user.getUsername());
	            feedback.put("Message", user.getMessage());
	            return feedback;
	        })
	        .toList(); 

	    return ResponseEntity.ok(feedbackList);
	}



   	/*@GetMapping("/elogin/{id}/{pass}/getfeedback")
	public List<String> getFeedback(@PathVariable String id,@PathVariable String pass) {
		return s.getAllFeedback(s.login(id, pass));
	}*/
	@GetMapping("/login/{id}/{pass}/trans")
    public List<Double> getTransaction(@PathVariable String id, @PathVariable String pass) {
        Banking user = s.login(id, pass);
        if (user != null) {
            return s.getTrans(user);
        }
        return Collections.emptyList(); // Return empty list if user is not found
    }
	@GetMapping("/elogin/{id}/{pass}/trans/{id1}")
	public List<Double> getTransaction(@PathVariable String id,@PathVariable String pass,@PathVariable String id1){
		return s.getAllTrans(s.elogin(id, pass), id1);
	}
	@PutMapping("/alogin/{id}/{pass}/emp/{id1}")
	public String makeEmp(@PathVariable String id,@PathVariable String pass,@PathVariable String id1) {
		return s.makeEmp(s.alogin(id, pass), id1);
	}
	/*@GetMapping("/elogin/{id}/{pass}/approve")
	public List<String> showApproval(@PathVariable String id,@PathVariable String pass) {
		return s.showApprovals(s.elogin(id, pass));
	}*/
	@PutMapping("/elogin/{id}/{pass}/trans/approve/{id1}/{b}")
	public String approveTrans(@PathVariable String id,@PathVariable String pass,@PathVariable String id1,@PathVariable boolean b) {
		return s.approveTrans(s.elogin(id, pass), id1,b);
	}
	/*@GetMapping("/elogin/{id}/{pass}/approve")
    public List<String> showApproval(@PathVariable String id, @PathVariable String pass) {
        return s.showApprovals(s.elogin(id, pass));
    }

    // Approve or Reject Loan
    @PutMapping("/elogin/{id}/{pass}/loan/approve/{loanId}/{status}")
    public String approveLoan(
        @PathVariable String id, 
        @PathVariable String pass,
        @PathVariable String loanId, 
        @PathVariable boolean status
    ) {
        return s.approveLoan(s.elogin(id, pass), loanId, status);
    }*/
	@GetMapping("/loans")
	public List<Map<String, Object>> getAllLoans() {
	    List<Map<String, Object>> loans = repo.findAll().stream()
	        .filter(Banking::isNeedLoan)
	        .map(user -> {
	            Map<String, Object> loanData = new HashMap<>();
	            loanData.put("id", user.getUsername());
	            loanData.put("username", user.getUsername());
	            loanData.put("neededLoan", user.getNeededLoan());
	            loanData.put("loanType", user.getLoanType());
	            loanData.put("status", user.isAllowTrans() ? "Approved" : "Pending");
	            return loanData;
	        }).collect(Collectors.toList());
	    
	    return loans;
	}


	@PutMapping("/elogin/{id}/{pass}/loan/approve/{loanId}/{status}")
	public ResponseEntity<String> approveLoan(@PathVariable String id, @PathVariable String pass,
	                                          @PathVariable String loanId, @PathVariable boolean status) {
	    Banking user = s.elogin(id, pass); // Authenticate Employee
	    String response = s.approveLoan(user, loanId, status);
	    return ResponseEntity.ok(response);
	}

	
	@GetMapping("/elogin/{id}/{pass}/approve")
	public List<Map<String, Object>> showApproval(@PathVariable String id, @PathVariable String pass) {
	    List<String> approvals = s.showApprovals(s.elogin(id, pass));

	    return approvals.stream().map(approval -> {
	        Map<String, Object> approvalData = new HashMap<>();
	        approvalData.put("approvalInfo", approval);
	        return approvalData;
	    }).collect(Collectors.toList());
	}


	@DeleteMapping("/alogin/{id}/{pass}/delete/{id1}")
	public String delete(@PathVariable String id,@PathVariable String pass,@PathVariable String id1) {
		return s.deleteData(s.alogin(id, pass), id1);
	}
	/*@PutMapping("/alogin/{id}/pass/freeze/{id1}")
	public String freeze(@PathVariable String id,@PathVariable String pass,@PathVariable String id1) {
		return s.freeze(s.alogin(id, pass), id1);
	}*/
	@PutMapping("/alogin/{adminId}/{pass}/freeze/{userId}")
	public ResponseEntity<?> freezeUser(@PathVariable String adminId, @PathVariable String pass, @PathVariable String userId) {
	    Banking admin = s.alogin(adminId, pass);

	    if (admin == null || !admin.isAdmin()) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Unauthorized: Only admins can freeze accounts");
	    }

	    String result = s.freeze(userId);  // ✅ Only pass the user ID
	    return ResponseEntity.ok(result);
	}

	
	@GetMapping("/alogin/dashboard")
	public ResponseEntity<Map<String, Object>> fetchDashboardData() {
	    Map<String, Object> dashboardData = s.fetchDashboardData();
	    return ResponseEntity.ok(dashboardData);
	}


}