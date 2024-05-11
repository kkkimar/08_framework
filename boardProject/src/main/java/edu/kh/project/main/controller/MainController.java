package edu.kh.project.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.main.model.MainService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller // bean 등록
public class MainController {

	
	private final MainService service;
	
	
	@RequestMapping("/") // "/" 요청 매핑 (method 가리지 않음)
	public String mainPage() {
		
		return "common/main";
	}
	
	
	
	/** 비밀번호 초기화
	 * @param inputNo : 초기화할 회원 번호
	 * @return result
	 */
	@ResponseBody
	@PutMapping("resetPw")
	public int resetPw(@RequestBody int inputNo) {
		
		
		return service.inputPw(inputNo) ;
	}
	
	
	
	
	/** 계정 복구
	 * @param inputNo : 복구할 회원 번호
	 * @return result
	 */
	@ResponseBody
	@PutMapping("resetId")
	public int resetId(@RequestBody int inputNo) {
		
		
		return service.resetId(inputNo);
	}
	
	
	// LoginFilter -> loginError 리다이렉트
	// -> message를 만들어서 메인 페이지로 리다이렉트
	@GetMapping("loginError")
	public String loginError(RedirectAttributes ra) {
		
		ra.addFlashAttribute("message", "로그인 후 이용해 주세요");
		return "redirect:/";
	}
	
	
}
