package com.beahero.api.models;

import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@Data
public class PageModel<T> {
    List<T> content;
    int pageNumber;
    int pageSize;
    long numberOfItems;

    public PageModel(Page<T> page, PageRequest pageRequest) {
        this.content = page.getContent();
        this.pageNumber = pageRequest.getPageNumber();
        this.pageSize = page.getSize();
        this.numberOfItems = page.getNumberOfElements();
    }
}
