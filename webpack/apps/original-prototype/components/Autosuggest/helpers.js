import React from 'react'

export const getGeneSuggestionValue = (gene) => gene.name
export const renderGeneSuggestion = (gene) => <div>{gene.name}</div>

export const getTagSuggestionValue = (tag) => tag.name
export const renderTagSuggestion = (tag) => <div>{tag.name}</div>

export const getPartnerSuggestionValue = (partner) => partner.name
export const renderPartnerSuggestion = (partner) => <div>{partner.name}</div>

export const getFairSuggestionValue = (fair) => fair.name
export const renderFairSuggestion = (fair) => <div>{fair.name}</div>
