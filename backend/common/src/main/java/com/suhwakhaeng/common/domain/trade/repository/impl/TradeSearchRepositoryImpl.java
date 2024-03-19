package com.suhwakhaeng.common.domain.trade.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suhwakhaeng.common.domain.trade.dto.TradeListResponse;
import com.suhwakhaeng.common.domain.trade.dto.TradeSearchRequest;
import static com.suhwakhaeng.common.domain.trade.entity.QTradeBoard.tradeBoard;
import static com.suhwakhaeng.common.domain.user.entity.QUser.user;
import static com.suhwakhaeng.common.domain.trade.entity.QTradeLike.tradeLike;

import com.suhwakhaeng.common.domain.trade.enums.TradeCate;
import com.suhwakhaeng.common.domain.trade.repository.TradeSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class TradeSearchRepositoryImpl implements TradeSearchRepository {
    private final JPAQueryFactory queryFactory;

    private BooleanBuilder getSearchOption(TradeSearchRequest request){
        BooleanBuilder searchOptions = new BooleanBuilder();
        if(request.id() != null){
            searchOptions.and(tradeBoard.id.gt(request.id()));
        }

        if(request.cate() != null){
            searchOptions.and(tradeBoard.cate.eq(request.cate()));
        }

        if(request.keyword() != null){
            searchOptions.and(tradeBoard.title.contains(request.keyword()));
        }

        return searchOptions;
    }

    @Override
    public List<TradeListResponse> searchTrade(Long userId, TradeSearchRequest tradeSearchRequest) {
        BooleanBuilder searchOptions = getSearchOption(tradeSearchRequest);

        List<Tuple> fetch = queryFactory
                .select(
                    tradeBoard.id.as("id"),
                    tradeBoard.cate.as("cate"),
                    tradeBoard.image1.as("image1"),
                    tradeBoard.title.as("title"),
                    tradeBoard.createdAt.as("createdAt"),
                    tradeBoard.price.as("price"),
                    ExpressionUtils.as(
                        JPAExpressions.selectOne()
                            .from(tradeLike)
                            .where(tradeLike.tradeLikePK.tradeBoard.id.eq(tradeBoard.id)
                                    .and(tradeLike.tradeLikePK.user.id.eq(userId)))
                            .exists(),
                        "isLiked"
                    ),
                    tradeLike.count().as("likeCnt")
                )
                .from(tradeBoard)
                .join(user).on(tradeBoard.user.id.eq(user.id))
                .leftJoin(tradeLike).on(tradeBoard.id.eq(tradeLike.tradeLikePK.tradeBoard.id))
                .where(searchOptions)
                .groupBy(tradeBoard.id, tradeBoard.cate, tradeBoard.image1, tradeBoard.title, tradeBoard.createdAt, tradeBoard.price)
                .orderBy(tradeBoard.id.asc())
                .limit(10)
                .fetch();


        return fetch.stream().map(tuple -> {
            return TradeListResponse.builder()
                    .id(tuple.get(0, Long.class))
                    .cate(tuple.get(1, TradeCate.class))
                    .image1(tuple.get(2, String.class))
                    .title(tuple.get(3, String.class))
                    .createdAt(tuple.get(4, LocalDateTime.class))
                    .price(tuple.get(5, Long.class))
                    .isLiked(tuple.get(6, Boolean.class))
                    .likeCnt(tuple.get(7, Long.class))
                    .build();
        }).toList();
    }
}