package com.example.demo.uss.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static com.example.demo.cmm.utl.Util.*;

import com.example.demo.cmm.enm.Messenger;
import com.example.demo.cmm.enm.Table;
import com.example.demo.cmm.service.CommonMapper;
import com.example.demo.cmm.utl.Pagination;
import com.example.demo.uss.service.Student;
import com.example.demo.uss.service.StudentMapper;
import com.example.demo.uss.service.StudentService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired StudentService studentService;
    @Autowired Pagination page;
    @Autowired StudentMapper studentMapper;
    @Autowired CommonMapper commonMapper;
    
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping("")
    public Messenger register(@RequestBody Student s){
        return studentMapper.insert(s)==1?Messenger.SUCCESS:Messenger.FAILURE;
    }
    
    @PostMapping("/login")
    public Map<?,?> login(@RequestBody Student s){
        var map = new HashMap<>();
        Student result = studentMapper.login(s);
        map.put("message", result!=null?"SUCCESS":"FAILURE");
        map.put("sessionUser", result);
        return map;
    }
    
    @GetMapping("/{userid}")
    public Student profile(@PathVariable String userid){
        return studentMapper.selectById(userid);
    }
    
    @GetMapping("/page/{pageSize}/{pageNum}")
    public Map<?,?> list(@PathVariable String pageSize, 
    					 @PathVariable String pageNum) {
    	logger.info("Students List execute...");
    	var map = new HashMap<String, Object>();
    	var page = new Pagination(
				Table.STUDENTS.toString(), 
				integer.apply(pageSize),
				integer.apply(pageNum),
				commonMapper.count(Table.STUDENTS.toString()));
		map.put("list", studentService.list(page));
        map.put("page", page);
        return map;
    }
    
    /* 사용하지 않음. 위 list 메소드와 비교해볼 것. (list메소드: stuNum 역순 정렬, selectAll메소드: stuNum오름차순 정렬)*/
    @GetMapping("/page/{pageSize}/{pageNum}/selectAll")
    public List<?> selectAll(@PathVariable String pageSize, 
    						 @PathVariable String pageNum) {
    	logger.info("Students List execute...");
        return studentMapper.selectAll(new Pagination(
					        				Table.STUDENTS.toString(), 
					        				integer.apply(pageSize),
					        				integer.apply(pageNum),
					        				commonMapper.count(Table.STUDENTS.toString())));
    }
    
    @PutMapping("")
    public Messenger update(@RequestBody Student s){
        return studentMapper.update(s) == 1 ? Messenger.SUCCESS : Messenger.FAILURE ;
    }
    
    @DeleteMapping("")
    public Messenger delete(@RequestBody Student s){
    	logger.info("Students Deleted Execute ...");
        return studentMapper.delete(s) == 1 ? Messenger.SUCCESS : Messenger.FAILURE ;
    }
    
    @GetMapping("/truncate")
    public Messenger truncate() {
    	logger.info("Students Truncated Execute ...");
    	return studentService.truncate() == 1 ? Messenger.SUCCESS : Messenger.FAILURE ;
    }
    
    @GetMapping("/insert-many/{count}")
    public String insertMany(@PathVariable String count) {
    	logger.info(String.format("Insert %s Students ...",count));
    	return string.apply(studentService.insertMany(Integer.parseInt(count)));
    }
    
    @GetMapping("/count")
    public String count() {
    	logger.info(String.format("Count Students ..."));
    	return string.apply(commonMapper.count(Table.STUDENTS.toString()));
    }
    
    @GetMapping("/find-by-gender/{gender}")
    public String findByGender(@PathVariable String gender) {
    	logger.info(String.format("Find By $s from Students...", gender));
    	return  null ;  // string.apply(studentService.selectByGender(gender));
    }
    
}