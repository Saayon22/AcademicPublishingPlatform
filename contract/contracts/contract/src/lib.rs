#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Env, String};

#[contracttype]
#[derive(Clone)]
pub struct Paper {
    pub id: u64,
    pub title: String,
    pub author: String,
    pub content_hash: String,
}

#[contracttype]
pub enum DataKey {
    PaperCount,
    Paper(u64),
}

#[contract]
pub struct AcademicPublishing;

#[contractimpl]
impl AcademicPublishing {

    pub fn publish_paper(env: Env, title: String, author: String, content_hash: String) -> u64 {
        let mut count: u64 = env
            .storage()
            .instance()
            .get(&DataKey::PaperCount)
            .unwrap_or(0u64);

        count += 1;

        let paper = Paper {
            id: count,
            title,
            author,
            content_hash,
        };

        env.storage().instance().set(&DataKey::Paper(count), &paper);
        env.storage().instance().set(&DataKey::PaperCount, &count);

        count
    }

    pub fn get_paper(env: Env, id: u64) -> Option<Paper> {
        env.storage().instance().get(&DataKey::Paper(id))
    }

    pub fn get_paper_count(env: Env) -> u64 {
        env.storage()
            .instance()
            .get(&DataKey::PaperCount)
            .unwrap_or(0u64)
    }
}